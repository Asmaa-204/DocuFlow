'use strict';

const { Model, DataTypes } = require('sequelize');

const StageSchema = {
  
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
  },

  stageOrder: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  workflowId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = (sequelize) => {

  class Stage extends Model {
    static associate(models) {
  
      Stage.belongsTo(models.Workflow, {
        foreignKey: 'workflowId',
        as: 'workflow'
      });

      Stage.hasMany(models.Request, {
        foreignKey: 'stageId',
        as: 'requests',
        onDelete: 'CASCADE'
      });

      Stage.hasMany(models.WorkflowInstance, {
        foreignKey: 'stageId',
        as: 'instances',
        onDelete: 'CASCADE'
      });

    }
  }

  Stage.init(StageSchema, {
    sequelize,
    modelName: 'Stage',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['workflowId', 'stageOrder']
      }
    ]
  });

  return Stage;
};
