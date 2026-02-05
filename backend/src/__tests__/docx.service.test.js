const DocxService = require('../services/docx.service');
const tmp = require('tmp-promise');
const fs = require('fs');

jest.mock('tmp-promise');
jest.mock('fs');
jest.mock('libreoffice-convert', () => ({
    convert: jest.fn((buffer, ext, opts, cb) => cb(null, Buffer.from('pdf content')))
}));

describe('DocxService', () => {
    describe('convertToPdf', () => {
        it('should call tmp.file() and not file()', async () => {
            const cleanup = jest.fn();
            tmp.file.mockResolvedValue({ path: '/tmp/test.docx', cleanup });
            fs.writeFileSync.mockReturnValue(undefined);

            const docBuffer = Buffer.from('docx content');
            await DocxService.convertToPdf(docBuffer);

            expect(tmp.file).toHaveBeenCalledWith({ postfix: '.docx' });
            expect(fs.writeFileSync).toHaveBeenCalledWith('/tmp/test.docx', docBuffer);
            expect(cleanup).toHaveBeenCalled();
        });
    });
});
