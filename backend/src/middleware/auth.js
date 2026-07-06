const jwt = require("jsonwebtoken");
const { eq } = require("drizzle-orm");
const AppError = require("../errors/AppError");
const { db, schema } = require("../db");
const asyncDec = require("../utils/asyncDec");
const ar = require("../translations/ar");

async function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    return next(
      new AppError(`${ar.auth.unauthorized}: ${ar.auth.noTokenProvided}`, 401),
    );
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(
      new AppError(
        `${ar.auth.unauthorized}: ${ar.auth.invalidTokenFormat}`,
        401,
      ),
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return next(new AppError(`${ar.auth.unauthorized}: ${e.message}`, 401));
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, decoded.id),
  });

  if (!user) {
    return next(
      new AppError(`${ar.auth.unauthorized}: ${ar.auth.userNotFound}`, 401),
    );
  }

  // Strip password before attaching to req
  delete user.password;
  req.user = user;
  next();
}

function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(ar.auth.unauthorized, 401));
    }
    next();
  };
}

module.exports = { authenticate: asyncDec(authenticate), authorizeRoles };
