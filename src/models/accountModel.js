const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    validate: {
      notEmpty: {msg: 'The user ID cannot be empty.'},
      notNull: {msg: 'A user ID is required.'},
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'The account name cannot be empty.'},
      notNull: {msg: 'The account name is required.'},
    },
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      isDecimal: {msg: 'The balance must be a decimal.'},
      notNull: {msg: 'The balance is required.'},
    },
  },
}, {
  timestamps: true,
});

User.hasMany(Account, {foreignKey: 'userId'});
Account.belongsTo(User, {foreignKey: 'userId'});

module.exports = Account;
