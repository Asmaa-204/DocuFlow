const multer = require("multer");
const mimetypes = require("../../constants/mimeTypes");
const path = require('path');
const ar = require('../../translations/ar');

const storage = multer.diskStorage({

    destination: function(req, file, cb)
    {
        cb(null, "public/templates")
    },

    filename: function(req, file, cb)
    {
        cb(null, Date.now() + '-' + file.originalname)
    }

});

const limits = {
    fileSize: 10 * 1024 * 1024,
    files: 1
}

const fileFilter = function(req, file, cb)
{
    const checkMimetype = file.mimetype === mimetypes.DOCX;
    const checkExtension = /\.docx$/i.test(path.extname(file.originalname));
    
    if(checkExtension && checkMimetype)
        cb(null, true);
    else
        cb(new Error(ar.upload.onlyDocxAllowed), false)
}

module.exports = multer({
    storage,
    limits,
    fileFilter,
    preservePath: false
});