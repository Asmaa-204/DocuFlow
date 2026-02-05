const WorkflowService = require('../services/workflow.service');
const { Workflow } = require('../models');
const { validate: validateWorkflow } = require("../validators/workflow.validate");

jest.mock('../models', () => ({
    Workflow: {
        create: jest.fn()
    },
    Stage: {
        create: jest.fn()
    },
    Template: {
        findAll: jest.fn()
    },
    sequelize: {
        transaction: jest.fn(cb => cb({}))
    }
}));

jest.mock('../validators/workflow.validate', () => ({
    validate: jest.fn()
}));

jest.mock('../utils/withTransaction', () => jest.fn(cb => cb({})));

describe('WorkflowService', () => {
    describe('createWorkflow', () => {
        it('should call validateWorkflow', async () => {
            Workflow.create.mockResolvedValue({ id: 1 });

            const title = 'Test Workflow';
            const description = 'Test Description';
            const stagesInput = [];

            await WorkflowService.createWorkflow(title, description, stagesInput);

            expect(validateWorkflow).toHaveBeenCalledWith({
                title,
                description,
                stages: stagesInput
            });
        });
    });
});
