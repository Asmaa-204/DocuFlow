const Joi = require("joi");
const AppError = require("../errors/AppError");

const stageSchema = Joi.object({
    title: Joi.string().required(),
    role: Joi.string().valid('professor', 'department_manager', 'administrator').required(),
    description: Joi.string().allow('', null),
    stageOrder: Joi.number().integer().min(1).required(),
    templateIds: Joi.array().items(Joi.number().integer().positive()).optional()
});

module.exports = {
    schema: stageSchema
}
