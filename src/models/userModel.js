const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'The name cannot be empty.'},
      notNull: {msg: 'The name is required.'},
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {msg: 'Must be a valid email address.'},
      notEmpty: {msg: 'The email cannot be empty.'},
      notNull: {msg: 'The email is required.'},
    },
    // Normalize email
    set(value) {
      this.setDataValue('email', value.toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'The password cannot be empty.'},
      notNull: {msg: 'The password is required.'},
      len: {
        args: [6, 100],
        msg: 'The password should be between 6 and 100 characters long.',
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: {
        args: [['user', 'admin', 'moderator']],
        msg: 'Invalid role.',
      },
    },
  },
}, {
  /* Enabling soft deletes */
  paranoid: true,
  timestamps: true,
});

/* Password hashing middleware */
User.beforeSave(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
