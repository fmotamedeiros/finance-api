const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Account = require('./accountModel');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('expense', 'income'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

Transaction.belongsTo(Account, {foreignKey: 'accountId', as: 'account'});

/* Updating balance after creating transaction */
Transaction.afterCreate(async (transaction, options) => {
  const account = await Account.findByPk(transaction.accountId);
  if (account) {
    account.balance = transaction.type === 'income' ?
      Number(account.balance) + Number(transaction.value) :
      Number(account.balance) - Number(transaction.value);
    await account.save();
  }
});

/* Hook to save data fields before updating */
Transaction.beforeUpdate((transaction, options) => {
  transaction._previousDataValues = {...transaction._previousDataValues};
});

/* Hook to revert transaction and apply the updated one */
Transaction.afterUpdate(async (transaction, options) => {
  const account = await Account.findByPk(transaction.accountId);
  if (!account) return;

  /* Get the previous values */
  const previousValues = transaction._previousDataValues;

  /* Revert the transaction */
  if (previousValues.type === 'income') {
    account.balance = Number(account.balance) - Number(previousValues.value);
  } else {
    account.balance = Number(account.balance) + Number(previousValues.value);
  }

  /* Apply the updated transaction */
  if (transaction.type === 'income') {
    account.balance = Number(account.balance) + Number(transaction.value);
  } else {
    account.balance = Number(account.balance) - Number(transaction.value);
  }

  await account.save();
});

/* Rollback transaction after deleting */
Transaction.afterDestroy(async (transaction, options) => {
  const account = await Account.findByPk(transaction.accountId);
  if (account) {
    account.balance = transaction.type === 'income' ?
      Number(account.balance) - Number(transaction.value) :
      Number(account.balance) + Number(transaction.value);
    await account.save();
  }
});

module.exports = Transaction;
