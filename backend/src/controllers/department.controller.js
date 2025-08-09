const DepartmentService = require('../services/department.service');
const asyncDec = require('../utils/asyncDec');

async function createDepartment(req, res)
{
    const department = await DepartmentService.createDepartment(req.body);

    res.json({
        "status": "success",
        "data": { department }
    });
}


async function getAllDepartments(req, res)
{
    const departments = await DepartmentService.getAllDepartments();

    res.json({
        "status": "success",
        "data": { departments }
    });
}


async function getDepartment(req, res)
{
    const { departmentId } = req.params;
    const department = await DepartmentService.getDepartmentById(departmentId);

    res.json({
        "status": "success",
        "data": { department }
    });
}

async function updateDepartment(req, res)
{
    const { departmentId } = req.params;
    const updatedDepartment = await DepartmentService.updateDepartment(departmentId, req.body);

    res.json({
        "status": "success",
        "data": { updatedDepartment }
    });
}

module.exports = {
    createDepartment: asyncDec(createDepartment),
    getAllDepartments: asyncDec(getAllDepartments),
    getDepartment: asyncDec(getDepartment),
    updateDepartment: asyncDec(updateDepartment)
};