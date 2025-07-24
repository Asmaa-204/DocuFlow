const AppError = require('../errors/AppError');
const { Template } = require("../models");
const { validateSchema } = require('../utils/ajv');


class TemplateService
{
    static async createTemplate(name, description, schema, url)
    {
        if(!validateSchema(schema)) 
        {
            const errors = validateSchema.errors.map(err => `${err.instancePath} ${err.message}`);
            throw new AppError(`Invalid schema: ${errors.join(', ')}`, 400);
        }

        const template = await Template.create({
            name,
            description,
            schema,
            url        
        });

        return template;
    }
}

module.exports = TemplateService;