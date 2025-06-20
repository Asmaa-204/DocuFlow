
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const { User } = require("../models");
const asyncDec = require("../utils/asyncDec");

async function authenticate(req, res, next) {

    if (!req.headers.authorization) {
        return next(new AppError("Unauthorized: No token provided", 401));
    }

    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return next(new AppError("Unauthorized: Invalid token format", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
        return next(new AppError("Unauthorized: User not found", 401));
    }

    req.user = user;
    next();
}

function authorizeRoles(allowedRoles) {
    
    return (req, res, next) => {
        
        const userRole = req.user.role; // assuming req.user is populated by auth middleware
  
        if (!allowedRoles.includes(userRole)) {
            return next(new AppError(`Unauthorized`, 401));
        }
        
        next();
    };
}


module.exports = {
    authenticate: asyncDec(authenticate),
    authorizeRoles
}