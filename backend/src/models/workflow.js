'use strict';

const { Model, DataTypes } = require('sequelize');

const WorkflowSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {

    class Workflow extends Model {
        static associate(models) {
            
            Workflow.hasMany(models.Stage, {
                foreignKey: 'workflowId',
                as: 'stages',
                onDelete: 'CASCADE'
            });

            Workflow.hasMany(models.Stage, {
                foreignKey: 'workflowId',
                as: 'filterByRole',
                onDelete: 'CASCADE'
            })

            Workflow.hasMany(models.WorkflowInstance, {
                foreignKey: 'workflowId',
                as: 'instances',
                onDelete: 'CASCADE'
            });

        }
    }

    Workflow.init(WorkflowSchema, {
        sequelize,
        modelName: 'Workflow',
        timestamps: true
    });

    return Workflow;
};


