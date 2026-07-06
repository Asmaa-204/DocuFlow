const bcrypt = require("bcryptjs");
const { eq, desc } = require("drizzle-orm");
const asyncDec = require("../utils/asyncDec");
const InstanceService = require("../services/instance.service");
const RequestService = require("../services/request.service");
const AppError = require("../errors/AppError");
const ar = require("../translations/ar");
const { db, schema } = require("../db");
const { logActivity } = require("../utils/activityLogger");
const { hashPassword } = require("../services/auth.service");

async function getCurrentUser(req, res) {
  res.status(200).json({ status: "success", data: { user: req.user } });
}

async function getMyInstances(req, res) {
  delete req.query.userId;
  const instances = await InstanceService.getUserInstances(
    req.user.id,
    req.query,
  );
  res.status(200).json({ status: "success", data: { instances } });
}

async function getMyRequests(req, res) {
  const type = req.query.type || "sent";
  delete req.query.type;
  delete req.query.userId;

  let requests = [];
  if (type === "sent")
    requests = await RequestService.getUserSentRequests(req.user.id, req.query);
  else if (type === "inbox")
    requests = await RequestService.getUserIncomingRequests(
      req.user.id,
      req.query,
    );

  res.status(200).json({ status: "success", data: { requests } });
}

async function updateProfile(req, res) {
  const { firstName, lastName, email } = req.body;

  const [updated] = await db
    .update(schema.users)
    .set({ firstName, lastName, email })
    .where(eq(schema.users.id, req.user.id))
    .returning();

  if (!updated) throw new AppError(ar.auth.userNotFound, 404);
  delete updated.password;

  await logActivity(updated.id, "PROFILE_UPDATE", {
    firstName,
    lastName,
    email,
  });

  res.status(200).json({
    status: "success",
    message: ar.profile.updateSuccess,
    data: { user: updated },
  });
}

async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, req.user.id),
  });
  if (!user) throw new AppError(ar.auth.userNotFound, 404);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new AppError(ar.profile.oldPasswordIncorrect, 400);

  await db
    .update(schema.users)
    .set({ password: await hashPassword(newPassword) })
    .where(eq(schema.users.id, user.id));

  await logActivity(user.id, "PASSWORD_CHANGE");

  res
    .status(200)
    .json({ status: "success", message: ar.profile.passwordChangeSuccess });
}

async function uploadAvatar(req, res) {
  if (!req.file) throw new AppError("No file uploaded", 400);
  const avatarUrl = `${req.file.filename}`;

  const [updated] = await db
    .update(schema.users)
    .set({ profilePicture: avatarUrl })
    .where(eq(schema.users.id, req.user.id))
    .returning();

  if (!updated) throw new AppError(ar.auth.userNotFound, 404);
  await logActivity(updated.id, "AVATAR_UPDATE", { avatarUrl });

  res.status(200).json({
    status: "success",
    message: ar.profile.avatarUpdateSuccess,
    data: { profilePicture: avatarUrl },
  });
}

async function getActivityHistory(req, res) {
  const activities = await db.query.activities.findMany({
    where: eq(schema.activities.userId, req.user.id),
    orderBy: [desc(schema.activities.createdAt)],
  });
  res.status(200).json({ status: "success", data: { activities } });
}

module.exports = {
  getCurrentUser: asyncDec(getCurrentUser),
  getMyInstances: asyncDec(getMyInstances),
  getMyRequests: asyncDec(getMyRequests),
  updateProfile: asyncDec(updateProfile),
  changePassword: asyncDec(changePassword),
  uploadAvatar: asyncDec(uploadAvatar),
  getActivityHistory: asyncDec(getActivityHistory),
};
