const TemplateController = require('../controllers/template.controller');
const TemplateService = require('../services/template.service');

jest.mock('../services/template.service');
jest.mock('../utils/asyncDec', () => fn => fn);

describe('TemplateController', () => {
    describe('createTemplate', () => {
        it('should call TemplateService.createTemplate with name', async () => {
            const req = {
                body: {
                    name: 'Test Template',
                    description: 'Test Description',
                    schema: {}
                },
                file: {
                    filename: 'test.docx'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            TemplateService.createTemplate.mockResolvedValue({ id: 1 });

            await TemplateController.createTemplate(req, res, next);

            expect(TemplateService.createTemplate).toHaveBeenCalledWith(
                'Test Template',
                'Test Description',
                {},
                '/static/templates/test.docx'
            );
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
