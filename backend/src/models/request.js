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

    assignedToUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    note: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('draft', 'pending', 'approved', 'rejected'),
        allowNull: false,
    },

    sentAt: {
        type: DataTypes.DATE,
        allowNull: true,
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

            Request.belongsTo(models.User, {
                foreignKey: "assignedToUserId",
                as: "assignee"
            });

            Request.belongsToMany(models.User, {
                through: models.Access,
                foreignKey: "requestId"          
            });

            Request.hasMany(models.Document, {
                foreignKey: 'requestId',
                as: 'documents'
            });
        }
    };

    Request.init(RequestSchema, {
        sequelize,
        modelName: 'Request',
        timestamps: true
    });

    Request.beforeUpdate((request, options) => {
        if (request.status === 'pending' && !request.sentAt) {
            request.sentAt = new Date();
        }
    });

    return Request;
}



