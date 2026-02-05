const AppError = require("../errors/AppError.js");
const ar = require('../translations/ar');

function notFoundHandler(req, res, next) {
    res.status(404).json({
        message: ar.error.notFound(req.originalUrl),
        status: "fail",
    });
}

function errorLogger(err,req,res,next) {
    console.error(err);
    next(err);
}

function errorHandler(err,req,res,next) {


    let statusCode = err.statusCode || 500;
    let status = err.status || "error";
    let message = err.message || ar.general.somethingWentWrong;

    res.status(statusCode).json({
        status,
        message,
    });
}

module.exports = { notFoundHandler, errorLogger, errorHandler };