const { eq } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const { validateSchema, validateUiSchema } = require("../utils/ajv");
const optionalize = require("../utils/optionalize");
const ar = require("../translations/ar");

class TemplateService {
  static async createTemplate(title, description, schemaJson, uiSchema, url) {
    if (!validateSchema(schemaJson)) {
      const errors = validateSchema.errors.map(
        (e) => `${e.instancePath} ${e.message}`,
      );
      throw new AppError(ar.template.invalidSchema(errors.join(", ")), 400);
    }
    if (!validateUiSchema(uiSchema)) {
      const errors = validateUiSchema.errors.map(
        (e) => `${e.instancePath} ${e.message}`,
      );
      throw new AppError(ar.template.invalidUiSchema(errors.join(", ")), 400);
    }

    const [template] = await db
      .insert(schema.templates)
      .values({
        title,
        description,
        schema: schemaJson,
        uiSchema,
        fileUrl: url,
      })
      .returning();

    return template;
  }

  static async getAllTemplates() {
    return db.query.templates.findMany();
  }

  static async getTemplateById(id) {
    const template = await db.query.templates.findFirst({
      where: eq(schema.templates.id, Number(id)),
    });
    if (!template) throw new AppError(ar.template.notFound, 404);
    template.schema = optionalize(template.schema);
    return template;
  }

  static async updateTemplate(id, data) {
    const template = await db.query.templates.findFirst({
      where: eq(schema.templates.id, Number(id)),
    });
    if (!template) throw new AppError(ar.template.notFound, 404);

    if (data.schema && !validateSchema(data.schema)) {
      const errors = validateSchema.errors.map(
        (e) => `${e.instancePath} ${e.message}`,
      );
      throw new AppError(ar.template.invalidSchema(errors.join(", ")), 400);
    }
    if (data.uiSchema && !validateUiSchema(data.uiSchema)) {
      const errors = validateUiSchema.errors.map(
        (e) => `${e.instancePath} ${e.message}`,
      );
      throw new AppError(ar.template.invalidUiSchema(errors.join(", ")), 400);
    }

    const [updated] = await db
      .update(schema.templates)
      .set(data)
      .where(eq(schema.templates.id, template.id))
      .returning();

    return updated;
  }
}

module.exports = TemplateService;
