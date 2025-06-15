'use strict';

const { Model, DataTypes } = require('sequelize');

const RequestSchema = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    instanceId: {
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
    },

    note: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('draft', 'pending', 'approved', 'rejected'),
        allowNull: false,
    }
};

module.exports = (sequelize) => {

    class Request extends Model {
        static associate(models){

            Request.belongsTo(models.WorkflowInstance, {
                foreignKey: 'instanceId',
                as: 'instance'
            });

            Request.belongsTo(models.Stage, {
                foreignKey: 'stageId',
                as: 'stage'
            });

            Request.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    };

    Request.init(RequestSchema, {
        sequelize,
        modelName: 'Request',
        timestamps: true
    });

    return Request;
}



