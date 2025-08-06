const AppError = require("../errors/AppError");
const { Document, User, Request, Template } = require("../models");
const { ajv } = require('../utils/ajv');


class DocumentService
{
    static includeUser = {
        model: Request,
        //status is needed for checking request status
        attributes: ['id', 'status'], 
        include: {
            model: User,
            attributes: ['id']
        }
    };

    static includeSchema = {
        model: Template,
        attributes: ['schema', 'uiSchema'],
    };

    static async getDocumentById(user, documentId)
    {
        const document = await Document.findByPk(
            documentId,
            {include: DocumentService.includeSchema}
        );

        const { accessLevel } = await Access.findOne({
            where: {
                requestId: document.requestId,
                userId
            }
        });

        if(!document)
            throw new AppError("Document Not Found", 404);

        if(!accessLevel || user.role !== 'aministrator')
            throw new AppError("You do not have permission to view this document", 403);
    
        return document;
    }

    static async updateDocument(userId, documentId, data)
    {
        const options = {}
        options.include = [DocumentService.includeUser, DocumentService.includeSchema];

        const document = await Document.findByPk(documentId, options);

        if(!document)
            throw new AppError("Document Not Found", 404);

        const { accessLevel } = await Access.findOne({
            where: {
                requestId: document.requestId,
                userId
            }
        });

        if(!accessLevel || accessLevel !== 'edit')
            throw new AppError("You do not have permission to update this document", 403);

        const validate = ajv.compile(document.Template.schema);
        
        if(!validate(data))
        {
            const errors = validate.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid data: ${errors.join(', ')}`, 400);
        }

        Object.assign(document.data, data);
        
        await document.save()    
        return document
    }

}


module.exports = DocumentService;