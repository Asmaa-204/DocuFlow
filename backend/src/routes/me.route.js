const express = require("express");
const { authenticate } = require("../middleware/auth");

const {
    getCurrentUser,
    getMyInstances,
    getMyRequests
} = require("../controllers/me.controller");

const meRouter = express.Router();

meRouter.get("/", authenticate, getCurrentUser);
meRouter.get("/instance", authenticate, getMyInstances);
meRouter.get("/request", authenticate, getMyRequests);

module.exports = meRouter;
