const asyncDec = require("../utils/asyncDec");
const TemplateService = require("../services/template.service");
const AppError = require("../errors/AppError");


async function createTemplate(req, res, next) {
    const { name, description, schema } = req.body;

    if (!req.file)
        throw new AppError("No File Upload");

    const fileUrl = `/static/templates/${req.file.filename}`;

    // add a validation layer for schema as it's json

    const template = await TemplateService.createTemplate(name, description, schema, fileUrl);

    res.status(200).json({
        "status": "success",
        "data": { template }
    });
}

async function getAllTemplates(req, res, next) {
    const templates = await TemplateService.getAllTemplates();

    res.status(200).json({
        "status": "success",
        "data": { templates }
    });
}


async function getTemplateById(req, res, next) {
    const { id } = req.params;

    const template = await TemplateService.getTemplateById(id);

    res.status(200).json({
        "status": "success",
        "data": { template }
    });
}

async function updateTemplate(req, res, next) {
    const { id } = req.params;
    const data = req.body;

    const template = await TemplateService.updateTemplate(id, data);

    res.status(200).json({
        "status": "success",
        "data": { template }
    });
}



module.exports = {
    createTemplate: asyncDec(createTemplate),
    getAllTemplates: asyncDec(getAllTemplates),
    getTemplateById: asyncDec(getTemplateById),
    updateTemplate: asyncDec(updateTemplate)
}
