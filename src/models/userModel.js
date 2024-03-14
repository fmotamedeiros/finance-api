const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "The name cannot be empty." },
      notNull: { msg: "The name is required." }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: { msg: "Must be a valid email address." },
      notEmpty: { msg: "The email cannot be empty." },
      notNull: { msg: "The email is required." }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "The password cannot be empty." },
      notNull: { msg: "The password is required." },
      len: {
        args: [6, 100],
        msg: "The password should be between 6 and 100 characters long."
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  }
}, {
  timestamps: true
});

module.exports = User;
