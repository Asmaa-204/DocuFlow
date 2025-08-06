const AppError = require('../errors/AppError');
const { Template } = require("../models");
const { validateSchema, validateUiSchema } = require('../utils/ajv');


class TemplateService
{
    static async createTemplate(title, description, schema,uiSchema, url)
    {
        if(!validateSchema(schema)) 
        {
            const errors = validateSchema.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid schema: ${errors.join(', ')}`, 400);
        }

        if(!validateUiSchema(uiSchema)) 
        {
            const errors = validateUiSchema.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid UI schema: ${errors.join(', ')}`, 400);
        }

        const template = await Template.create({
            title,
            description,
            schema,
            uiSchema,
            fileUrl: url        
        });

        return template;
    }


    static async getAllTemplates()
    {
        const templates = await Template.findAll();
        return templates;
    }


    static async getTemplateById(id)
    {
        const template = await Template.findByPk(id);

        if(!template)
            throw new AppError("Template Not Found", 404);

        return template;
    }

    static async updateTemplate(id, data)
    {
        const template = await Template.findByPk(id);

        if(!template)
            throw new AppError("Template Not Found", 404);

        if(data.schema && !validateSchema(data.schema)) 
        {
            const errors = validateSchema.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid schema: ${errors.join(', ')}`, 400);
        }

        if(data.uiSchema && !validateUiSchema(data.uiSchema)) 
        {
            const errors = validateUiSchema.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid UI schema: ${errors.join(', ')}`, 400);
        }

        template.update(data);
        return template;
    }





}

module.exports = TemplateService;