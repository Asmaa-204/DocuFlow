'use strict';

const { Model, DataTypes } = require('sequelize')

const ActivitySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.JSON,
        allowNull: true,
    }
};

module.exports = (sequelize) => {

    class Activity extends Model {
        static associate(models) {
            Activity.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
        }
    }

    Activity.init(ActivitySchema, {
        sequelize,
        modelName: 'Activity',
        timestamps: true
    });

    return Activity;
};
