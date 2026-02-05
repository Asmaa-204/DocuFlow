'use strict';

const { Model, DataTypes } = require('sequelize')
const bcrypt = require("bcryptjs");

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 6
  },
  role: {
    type: DataTypes.ENUM('professor', 'department_manager', 'administrator'),
    allowNull: false,
    defaultValue: 'professor',
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {

  class User extends Model {
    static associate(models) {

      User.hasMany(models.WorkflowInstance, {
        foreignKey: 'userId',
        as: 'instances',
      });

      User.hasMany(models.Request, {
        foreignKey: 'userId',
        as: 'requests',
      });

      User.hasMany(models.Request, {
        foreignKey: "assignedToUserId",
        as: "assignedRequests",
      });

      User.hasOne(models.Department, {
        foreignKey: "managerId",
        as: "managedDepartment",
      });

      User.hasMany(models.Department, {
        foreignKey: "affairsEmployeeId",
        as: "departments"
      });

      User.belongsTo(models.Department, {
        foreignKey: "departmentId",
        as: "department"
      });

      User.belongsToMany(models.Request, {
        through: models.Access,
        foreignKey: "userId"
      });
    }
  }

  User.init(UserSchema, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });

  // Hooks

  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }
  })

  User.beforeUpdate(async (user) => {
    user.setDataValue('id', user._previousDataValues.id)
  })


  // Instance Methods

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    return values
  }

  return User;
};