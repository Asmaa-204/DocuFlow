const express = require("express");
const { authenticate, authorizeRoles } = require("../middleware/auth")

const documentController = require("../controllers/document.controller");

const doucmentRouter = express.Router();

doucmentRouter.get("/:id", 
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    documentController.getDocument
);

doucmentRouter.get("/:id/pdf", 
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    documentController.getDocumentPdf
);

doucmentRouter.patch("/:id", 
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    documentController.updateDocument
);

module.exports = doucmentRouter;