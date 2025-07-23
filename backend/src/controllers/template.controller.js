const asyncDec = require("../utils/asyncDec");
const TemplateService = require("../services/template.service");
const AppError = require("../errors/AppError");


async function createTemplate(req, res, next)
{
    const {name, description, schema} = req.body;

    if(!req.file)
        throw new AppError("No File Upload");

    const fileUrl = `/static/templates/${req.file.filename}`;

    // add a validation layer for schema as it's json

    const template = await TemplateService.createTemplate(name, description, schema, url);

    res.status(200).json({
        "status": "success",
        "data": { template }
    });
}

module.exports = {
    createTemplate: asyncDec(createTemplate)
}
