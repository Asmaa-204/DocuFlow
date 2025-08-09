const { Department, User } = require('../models');
const AppError = require('../errors/AppError');
const department = require('../models/department');


class DepartmentService 
{    
    static async getAllDepartments() 
    {
        const departments = await Department.findAll();
        return departments;
    } 

    static async getDepartmentById(departmentId) 
    {
        const department = await Department.findByPk(departmentId);
    
        if (!department) 
        {
            throw new AppError('Department not found', 404);
        }
    
        return department;
    }

    static async createDepartment(data) 
    {
        const { 
            name,
            managerId,
            affairsEmployeeId
        } = data;

        if(managerId)
        {
            const manager = await User.findByPk(managerId);
            if(!manager) throw new AppError('Manager not found', 404);
        }

        if(affairsEmployeeId)
        {
            const affairsEmployee = await User.findByPk(affairsEmployeeId);
            if(!affairsEmployee) throw new AppError('Affairs Employee not found', 404);
        }

        const department = await Department.create({ 
            name, 
            managerId,
            affairsEmployeeId
        });

        return department;
    }

    static async updateDepartment(departmentId, data) 
    {
        const {
            name,
            managerId,
            affairsEmployeeId
        } = data;

        const department = await Department.findByPk(departmentId);

        if (!department) 
        {
            throw new AppError('Department not found', 404);
        };

        if(managerId)
        {
            const manager = await User.findByPk(managerId);
            if(!manager) throw new AppError('Manager not found', 404);
        }

        if(affairsEmployeeId)
        {
            const affairsEmployee = await User.findByPk(affairsEmployeeId);   
            if(!affairsEmployee) throw new AppError('Affairs Employee not found', 404);
        }

        department.name = name || department.name;
        department.managerId = managerId || department.managerId;
        department.affairsEmployeeId = affairsEmployeeId || department.affairsEmployeeId;

        await department.save();
    }
};


module.exports = DepartmentService;