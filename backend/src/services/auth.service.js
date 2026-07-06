const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { eq } = require("drizzle-orm");
const { db, schema } = require("../db");
const AppError = require("../errors/AppError");
const ar = require("../translations/ar");

async function hashPassword(plain) {
  return bcrypt.hash(plain, 8);
}

class AuthService {
  static async login(email, password) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) throw new AppError(ar.auth.invalidEmailOrPassword, 401);

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new AppError(ar.auth.invalidEmailOrPassword, 401);

    const payload = { ...user };
    delete payload.password;

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  }

  static async register(userData) {
    const { email } = userData;

    const existing = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
    if (existing) throw new AppError(ar.auth.emailAlreadyExists, 400);

    const toInsert = {
      ...userData,
      password: await hashPassword(userData.password),
    };
    const [inserted] = await db
      .insert(schema.users)
      .values(toInsert)
      .returning();

    delete inserted.password;
    return inserted;
  }
}

module.exports = AuthService;
module.exports.hashPassword = hashPassword;
