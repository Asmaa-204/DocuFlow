'use strict';

const { Model, DataTypes } = require('sequelize')

const WorkflowInstanceSchema = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    workflowId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    stageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

};

module.exports = (sequelize) => {

    class WorkflowInstance extends Model {
        static associate(models) {

            WorkflowInstance.belongsTo(models.Workflow, {
                foreignKey: 'workflowId',
                as: 'workflow'
            });

            WorkflowInstance.belongsTo(models.Stage, {
                foreignKey: 'stageId',
                as: 'stage'
            });

            WorkflowInstance.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });

            WorkflowInstance.hasMany(models.Request, {
                foreignKey: 'instanceId',
                as: 'requests',
                onDelete: 'CASCADE'
            });
        }
    };

    WorkflowInstance.init(WorkflowInstanceSchema, {
        sequelize,
        modelName: 'WorkflowInstance',
        timestamps: true
    });

    return WorkflowInstance;
};
        



