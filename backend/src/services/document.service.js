const AppError = require("../errors/AppError");
const { Document, User, Request, Template } = require("../models");


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
        attributes: ['schema']
    };

    static async getDocumentById(userId, documentId)
    {
        const document = await Document.findByPk(
            documentId,
            {include: DocumentService.includeSchema}
        );

        if(!document)
            throw new AppError("Document Not Found", 404);

        return document;
    }

    static async updateDocument(userId, documentId, data)
    {
        const document = await Document.findByPk(
            documentId, 
            {include: DocumentService.includeUser}
        );

        if(!document)
            throw new AppError("Document Not Found", 404);

        const ownerId = document?.request?.user?.id;

        if(ownerId !== userId)
            throw new AppError("Not Authorized", 403);

        if(document.request.status === "pending")
            throw new AppError("You can't update an already submitted document!");

        // update document --> not that simple
        // validate(data, schema)

        Object.assign(document.data, data);
        await document.save()
    
        return document
    }

}


module.exports = DocumentService;