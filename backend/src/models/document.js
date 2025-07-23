const { allow } = require("joi");
const { Model, DataTypes } = require("sequelize");

const DocumentSchema = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    data: {
        type: DataTypes.JSON
    },

    templateId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    requestId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = (sequelize) => {

    class Document extends Model
    {
        static associate(models)
        {
            Document.belongsTo(models.Request, {
                foreignKey: 'requestId',
                as: "request"
            });

            Document.belongsTo(models.Template, {
                foreignKey: 'templateId',
                as: "template"
            });
        }
    }

    Document.init(DocumentSchema, {
        sequelize,
        modelName: 'Document',
        timestamps: true
    });

    return Document;
}