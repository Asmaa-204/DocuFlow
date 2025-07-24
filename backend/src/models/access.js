const { Model, DataTypes } = require("sequelize")


const AccessSchema = {

    requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    accessLevel: {
        type: DataTypes.ENUM("read", "respond", "edit"),
        allowNull: false
    }

}


module.exports = (sequelize) => {

    class Access extends Model
    {
        static associate(models)
        {}
    }

    Access.init(AccessSchema, {
        sequelize,
        modelName: 'Access',
        timestamps: true
    });

    return Access;
}
