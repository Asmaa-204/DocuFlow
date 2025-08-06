const Joi = require("joi");
const AppError = require("../errors/AppError")

const { schema: stageSchema } = require("./stage.validate")

const workflowSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    stages: Joi.array().min(1).items(stageSchema).required()
});

function validateWorkflow(data)
{
    const { error } = workflowSchema.validate(data);

    if(error)
        throw new AppError(`Validation error: ${error.details.map(d => d.message).join(', ')}`, 400);

    const orders = data.stages.map(s => s.stageOrder).sort((a, b) => a - b);
    
    for (let i = 0; i < orders.length; i++) {
        if (orders[i] !== i + 1) {
            throw new AppError('stageOrder values must be sequential starting at 1', 400);
        }
    }
} 

module.exports = {
    schema: workflowSchema,
    validate: validateWorkflow
}