const asyncDec = require("../utils/asyncDec.js");
const DocumentService = require("../services/document.service");
const document = require("../models/document.js");

async function getDocument(req, res, next)
{
    const document = await DocumentService.getDocumentById(req.user, req.params.id);

    res.status(200).json({
        "status": "success",
        "data": document
    });
}

async function updateDocument(req, res, next)
{
    const { data }  = req.body
    const document = await DocumentService.updateDocument(req.user.id, req.params.id, data);

    res.status(200).json({
        "status": "success",
        "data": document
    });
}

async function getDocumentPdf(req, res, next)
{
    const pdfBuffer = await DocumentService.getDocumentPdf(req.user, req.params.id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
}

module.exports = {
    getDocument: asyncDec(getDocument),
    updateDocument: asyncDec(updateDocument),
    getDocumentPdf: asyncDec(getDocumentPdf)
}