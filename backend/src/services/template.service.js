const AppError = require('../errors/AppError');
const { Template } = require("../models");

class TemplateService
{
    static async createTemplate(name, description, schema, url)
    {
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