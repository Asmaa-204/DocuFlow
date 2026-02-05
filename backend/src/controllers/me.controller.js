const asyncDec = require("../utils/asyncDec");
const InstanceService = require("../services/instance.service");
const RequestService = require("../services/request.service");
const AppError = require("../errors/AppError");
const ar = require("../translations/ar");
const { User, Activity } = require("../models");
const { logActivity } = require("../utils/activityLogger");

async function getCurrentUser(req, res) {
    res.status(200).json({
        status: "success",
        data: {
            user: req.user
        }
    });
}

async function getMyInstances(req, res) {
    // Sanitize query parameters
    delete req.query.userId;
    const instances = await InstanceService.getUserInstances(req.user.id, req.query);

    res.status(200).json({
        status: "success",
        data: {
            instances
        }
    });
}

async function getMyRequests(req, res) {
    // Sanitize query parameters
    const type = req.query.type || 'sent';
    delete req.query.type;
    delete req.query.userId;

    let requests = [];

    if (type === 'sent')
        requests = await RequestService.getUserSentRequests(req.user.id, req.query);
    else if (type === 'inbox')
        requests = await RequestService.getUserIncomingRequests(req.user.id, req.query);

    res.status(200).json({
        status: "success",
        data: {
            requests
        }
    });
}

async function updateProfile(req, res) {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) throw new AppError(ar.auth.userNotFound, 404);

    await user.update({ firstName, lastName, email });
    await logActivity(user.id, 'PROFILE_UPDATE', { firstName, lastName, email });

    res.status(200).json({
        status: "success",
        message: ar.profile.updateSuccess,
        data: { user }
    });
}

async function changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) throw new AppError(ar.auth.userNotFound, 404);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new AppError(ar.profile.oldPasswordIncorrect, 400);

    user.password = newPassword;
    await user.save();
    await logActivity(user.id, 'PASSWORD_CHANGE');

    res.status(200).json({
        status: "success",
        message: ar.profile.passwordChangeSuccess
    });
}

async function uploadAvatar(req, res) {
    if (!req.file) throw new AppError("No file uploaded", 400);

    const avatarUrl = `/static/avatars/${req.file.filename}`;
    const user = await User.findByPk(req.user.id);

    if (!user) throw new AppError(ar.auth.userNotFound, 404);

    await user.update({ profilePicture: avatarUrl });
    await logActivity(user.id, 'AVATAR_UPDATE', { avatarUrl });

    res.status(200).json({
        status: "success",
        message: ar.profile.avatarUpdateSuccess,
        data: { profilePicture: avatarUrl }
    });
}

async function getActivityHistory(req, res) {
    const activities = await Activity.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
        status: "success",
        data: { activities }
    });
}

module.exports = {
    getCurrentUser: asyncDec(getCurrentUser),
    getMyInstances: asyncDec(getMyInstances),
    getMyRequests: asyncDec(getMyRequests),
    updateProfile: asyncDec(updateProfile),
    changePassword: asyncDec(changePassword),
    uploadAvatar: asyncDec(uploadAvatar),
    getActivityHistory: asyncDec(getActivityHistory)
};