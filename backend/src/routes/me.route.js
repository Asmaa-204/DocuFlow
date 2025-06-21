const express = require("express");
const asyncDec = require("../utils/asyncDec");
const { authenticate } = require("../middleware/auth");

const meRouter = express.Router();

const getCurrentUser = async (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });
};

meRouter.get("/", authenticate, asyncDec(getCurrentUser));

module.exports = meRouter;
