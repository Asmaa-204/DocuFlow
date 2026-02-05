const express = require("express");
const multer = require("multer");
const path = require("path");
const { authenticate } = require("../middleware/auth");

const {
    getCurrentUser,
    getMyInstances,
    getMyRequests,
    updateProfile,
    changePassword,
    uploadAvatar,
    getActivityHistory
} = require("../controllers/me.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/static/avatars"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const meRouter = express.Router();

meRouter.get("/", authenticate, getCurrentUser);
meRouter.get("/instance", authenticate, getMyInstances);
meRouter.get("/request", authenticate, getMyRequests);

meRouter.patch("/profile", authenticate, updateProfile);
meRouter.patch("/password", authenticate, changePassword);
meRouter.post("/avatar", authenticate, upload.single('avatar'), uploadAvatar);
meRouter.get("/activity", authenticate, getActivityHistory);

module.exports = meRouter;
