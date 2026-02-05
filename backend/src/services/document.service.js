const AppError = require("../errors/AppError");
const { Document, User, Request, Template, Access } = require("../models");
const DocxService = require("../services/docx.service");
const { ajv } = require('../utils/ajv');
const optionalize = require('../utils/optionalize');
const ar = require('../translations/ar');

class DocumentService
{
    static includeUser = {
        model: Request,
        attributes: ['id', 'status'], 
        as: 'request',
        include: {
            model: User,
            attributes: ['id'],
            as: 'user'
        }
    };

    static includeSchema = {
        model: Template,
        attributes: ['schema', 'uiSchema'],
        as: 'template'
    };

    static async getDocumentById(user, documentId)
    {
        const document = await Document.findByPk(
            documentId,
            {include: DocumentService.includeSchema}
        );

        if(!document)
            throw new AppError(ar.document.notFound, 404);

        const { accessLevel } = await Access.findOne({
            where: {
                requestId: document.requestId,
                userId: user.id
            }
        });

        if(!accessLevel && user.role !== 'administrator')
            throw new AppError(ar.document.noPermissionToView, 403);
   
        document.template.schema = optionalize(document.template.schema);
        return document;
    }

    static async validateDocumentData(document, optional) 
    {
        const template = await Template.findByPk(document.templateId);
        
        if (!template || !template.schema) {
            throw new AppError(ar.document.schemaNotFound, 400);
        }

        const schema = optional ? optionalize(template.schema) : template.schema;

        const validate = ajv.compile(schema);
        
        if (!validate(document.data)) {
            const errors = validate.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(ar.document.invalidData(errors.join(', ')), 400);
        }
    }

    static async validateDocumentsData(documents, optional, transaction)
    {
        await Promise.all(
            documents.map(document =>
                DocumentService.validateDocumentData(document, optional)
            )
        );
    }

    static async updateDocument(userId, documentId, data)
    {
        const options = {};
        options.include = [DocumentService.includeUser];

        const document = await Document.findByPk(documentId, options);

        if(!document)
            throw new AppError(ar.document.notFound, 404);

        if (!document.requestId) {
            throw new AppError(ar.document.invalidStateMissingRequestId, 400);
        }

        const { accessLevel } = await Access.findOne({
            where: {
                requestId: document.requestId,
                userId
            }
        });

        if(!accessLevel || accessLevel !== 'edit')
            throw new AppError(ar.document.noPermissionToUpdate, 403);

        document.data = data;
        await DocumentService.validateDocumentData(document, true);

        await document.save();        
        return document;
    }

    static async getDocumentPdf(user, documentId)
    {
        const includes = {
            model: Template,
            attributes: ['fileUrl'],
            as: 'template'
        };

        const document = await Document.findByPk(documentId, {
            include: includes
        });

        if(!document)
            throw new AppError(ar.document.notFound, 404);

        const { accessLevel } = await Access.findOne({
            where: {
                requestId: document.requestId,
                userId: user.id
            }
        });

        if(!accessLevel || (accessLevel !== 'read' && accessLevel !== 'edit'))
            throw new AppError(ar.document.noPermissionToView, 403);

        if (!document.template?.fileUrl) {
            throw new AppError(ar.document.templateFileUrlNotFound, 404);
        }

        const buffer = await DocxService.fillDocument(document.template.fileUrl, document.data);

        const pdfBuffer = await DocxService.convertToPdf(buffer);

        return pdfBuffer;
    }

}


module.exports = DocumentService;