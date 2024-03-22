const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
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
      notEmpty: {msg: 'The category name cannot be empty.'},
      notNull: {msg: 'The category name is required.'},
    },
  },
}, {
  timestamps: true,
});

Category.belongsTo(sequelize.models.User, {foreignKey: 'userId', as: 'user'});

module.exports = Category;
