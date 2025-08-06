const Docxtemplater = require("docxtemplater");
const PizZip = require("pizzip");
const tmp = require('tmp-promise');
const libre = require('libreoffice-convert');

const fs = require("fs");
const path = require("path");

class DocxService 
{
    static async fillDocument(templatePath, data) 
    {
        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(data);

        return doc.toBuffer();
    };

    static async convertToPdf(docBuffer) 
    {
        const { path: inputPath, cleanup } = await file({ postfix: '.docx' });

        // write the buffer to the temp file
        fs.writeFileSync(inputPath, docBuffer);

        return new Promise((resolve, reject) => {
            libre.convert(docBuffer, '.pdf', undefined, (err, done) => {
                cleanup(); // remove the temp .docx file
                if (err) return reject(err);
                resolve(done); // done is a Buffer containing the PDF file
            });
        });
    }

};

