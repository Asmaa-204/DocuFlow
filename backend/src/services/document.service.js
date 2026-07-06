const { eq, and } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const DocxService = require("./docx.service");
const { ajv } = require("../utils/ajv");
const optionalize = require("../utils/optionalize");
const ar = require("../translations/ar");

class DocumentService {
  static async getDocumentById(user, documentId) {
    const document = await db.query.documents.findFirst({
      where: eq(schema.documents.id, Number(documentId)),
      with: {
        template: { columns: { schema: true, uiSchema: true } },
      },
    });
    if (!document) throw new AppError(ar.document.notFound, 404);

    const access = await db.query.accesses.findFirst({
      where: and(
        eq(schema.accesses.requestId, document.requestId),
        eq(schema.accesses.userId, user.id),
      ),
    });

    if (!access?.accessLevel && user.role !== "administrator") {
      throw new AppError(ar.document.noPermissionToView, 403);
    }

    document.template.schema = optionalize(document.template.schema);
    return document;
  }

  static async validateDocumentData(document, optional) {
    const template = await db.query.templates.findFirst({
      where: eq(schema.templates.id, document.templateId),
    });

    if (!template || !template.schema) {
      throw new AppError(ar.document.schemaNotFound, 400);
    }

    const schemaJson = optional
      ? optionalize(template.schema)
      : template.schema;
    const validate = ajv.compile(schemaJson);

    if (!validate(document.data)) {
      const errors = validate.errors.map(
        (err) => `${err.instancePath} ${err.message}`,
      );
      throw new AppError(ar.document.invalidData(errors.join(", ")), 400);
    }
  }

  static async validateDocumentsData(documents, optional /* , transaction */) {
    await Promise.all(
      documents.map((d) => DocumentService.validateDocumentData(d, optional)),
    );
  }

  static async updateDocument(userId, documentId, data) {
    const document = await db.query.documents.findFirst({
      where: eq(schema.documents.id, Number(documentId)),
      with: {
        request: {
          columns: { id: true, status: true },
          with: { user: { columns: { id: true } } },
        },
      },
    });
    if (!document) throw new AppError(ar.document.notFound, 404);
    if (!document.requestId)
      throw new AppError(ar.document.invalidStateMissingRequestId, 400);

    const access = await db.query.accesses.findFirst({
      where: and(
        eq(schema.accesses.requestId, document.requestId),
        eq(schema.accesses.userId, userId),
      ),
    });

    if (!access || access.accessLevel !== "edit")
      throw new AppError(ar.document.noPermissionToUpdate, 403);

    document.data = data;
    await DocumentService.validateDocumentData(document, true);

    const [updated] = await db
      .update(schema.documents)
      .set({ data })
      .where(eq(schema.documents.id, document.id))
      .returning();

    return updated;
  }

  static async getDocumentPdf(user, documentId) {
    const document = await db.query.documents.findFirst({
      where: eq(schema.documents.id, Number(documentId)),
      with: { template: { columns: { fileUrl: true } } },
    });
    if (!document) throw new AppError(ar.document.notFound, 404);

    const access = await db.query.accesses.findFirst({
      where: and(
        eq(schema.accesses.requestId, document.requestId),
        eq(schema.accesses.userId, user.id),
      ),
    });

    if (
      !access ||
      (access.accessLevel !== "read" &&
        access.accessLevel !== "edit" &&
        access.accessLevel !== "respond")
    ) {
      throw new AppError(ar.document.noPermissionToView, 403);
    }

    if (!document.template?.fileUrl) {
      throw new AppError(ar.document.templateFileUrlNotFound, 404);
    }

    return await DocxService.fillDocument(
      document.template.fileUrl,
      document.data,
    );
  }
}

module.exports = DocumentService;
