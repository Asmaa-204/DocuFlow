
'use strict'

const { Model, DataTypes } = require("sequelize");

const TemplateSchema = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    schema: { 
        type: DataTypes.JSON,
        allowNull: false 
    },

    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = (sequelize) => {

    class Template extends Model{
        static associate(models)
        {
            Template.hasMany(models.Document, {
                foreignKey: 'templateId',
                as: 'documents'
            });

            Template.belongsToMany(models.Stage, {
                through: models.Condition,
                foreignKey: "templateId"
            });
        }
    }

    Template.init(TemplateSchema, {
        sequelize,
        modelName: 'Template',
        timestamps: true
    });

    return Template;
}
