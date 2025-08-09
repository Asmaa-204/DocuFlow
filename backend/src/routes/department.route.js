const express = require('express');


const departmentController = require('../controllers/department.controller');
const {
    authenticate,
    authorizeRoles
} = require('../middleware/auth');

const department = require('../models/department');

const departmentRouter = express.Router();

departmentRouter.get(
    '/',
    authenticate,
    departmentController.getAllDepartments  
);

departmentRouter.get(
    '/:departmentId',
    authenticate,
    departmentController.getDepartment
);

departmentRouter.post(
    '/',
    authenticate,
    authorizeRoles('administrator'),
    departmentController.createDepartment
);

departmentRouter.patch(
    '/:departmentId',
    authenticate,
    authorizeRoles('administrator'),
    departmentController.updateDepartment
);

module.exports = departmentRouter;