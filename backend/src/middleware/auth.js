
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const { User } = require("../models");
const asyncDec = require("../utils/asyncDec");
const ar = require('../translations/ar');

async function authenticate(req, res, next) {

    if (!req.headers.authorization) {
        return next(new AppError(`${ar.auth.unauthorized}: ${ar.auth.noTokenProvided}`, 401));
    }

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return next(new AppError(`${ar.auth.unauthorized}: ${ar.auth.invalidTokenFormat}`, 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log(decoded);
    const user = await User.findByPk(decoded.id);

    if (!user) {
        return next(new AppError(`${ar.auth.unauthorized}: ${ar.auth.userNotFound}`, 401));
    }

    req.user = user;
    next();
}

function authorizeRoles(allowedRoles) {
    
    return (req, res, next) => {
        
        const userRole = req.user.role; // assuming req.user is populated by auth middleware
  
        if (!allowedRoles.includes(userRole)) {
            return next(new AppError(ar.auth.unauthorized, 401));
        }
        
        next();
    };
}


module.exports = {
    authenticate: asyncDec(authenticate),
    authorizeRoles
}