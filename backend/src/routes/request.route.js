const express = require("express")

const requestController = require("../controllers/request.controller")
const { authenticate, authorizeRoles } = require("../middleware/auth");

const requestRouter = express.Router()

requestRouter.post(
    "/",
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    requestController.createRequest
);

requestRouter.get(
    "/",
    authenticate,
    authorizeRoles(["administrator"]),
    requestController.getAllRequests
);

requestRouter.get(
    "/:id",
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    requestController.getRequest
);

requestRouter.put(
    "/:id",
    authenticate,
    authorizeRoles(["professor", "department_manager", "administrator"]),
    requestController.updateRequest
);

module.exports = requestRouter
