'use strict'

const { Model, DataTypes } = require("sequelize");

const ConditionSchema = {

    stageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    templateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}

module.exports = (sequelize) => {

    class Condition extends Model
    {
        static associate(models){}
    }

    Condition.init(ConditionSchema, {
        sequelize,
        modelName: 'Condition',
        timestamps: true
    })

    return Condition;
}