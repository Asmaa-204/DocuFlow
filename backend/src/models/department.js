'use strict'

const { Model, DataTypes } = require('sequelize');

const DepartmentSchema = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    managerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    affairsEmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}


module.exports = (sequelize) => {

    class Department extends Model 
    {
        static associate(models)
        {
            Department.belongsTo(models.User, {
                foreignKey: 'managerId',
                as: 'manager'
            });

            Department.belongsTo(models.User, {
                foreignKey: 'affairsEmployeeId',
                as: 'affairsEmployee'
            });

            Department.hasMany(models.User, {
                foreignKey: 'departmentId',
                as: "employees",
                onDelete: "SET NULL"
            });
        }
    }


    Department.init(DepartmentSchema, {
        sequelize,
        modelName: 'Department',
        timestamps: true
    });


    return Department;
}