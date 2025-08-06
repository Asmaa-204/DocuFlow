const express = require("express");
const multer = require("multer");
const path = require("path")
const AppError = require("../errors/AppError");
const { authenticate, authorizeRoles } = require("../middleware/auth.js");

// Templates
const upload = require("../middleware/uploads/template")
const templateController = require("../controllers/template.controller.js");

const templateRouter = express.Router();

templateRouter.post(
    "/",
    authenticate,
    authorizeRoles(["administrator"]),
    upload.single("file"),
    templateController.createTemplate
);

templateRouter.get(
    "/",
    authenticate,
    authorizeRoles(["administrator"]),
    templateController.getAllTemplates
);

templateRouter.get(
    "/:id",
    authenticate,
    authorizeRoles(["administrator"]),
    templateController.getTemplateById
);

templateRouter.patch(
    "/:id",
    authenticate,
    authorizeRoles(["administrator"]),
    templateController.updateTemplate
);



module.exports = templateRouter;