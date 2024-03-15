const Transaction = require('../../models/transactionModel');
const logger = require('../../config/logger');

exports.createTransaction = async (req, res) => {
  try {
    const { accountId, categoryId, date, description, value, type } = req.body;
    const transaction = await Transaction.create({
      accountId,
      categoryId,
      date,
      description,
      value,
      type,
    });
    logger.info(`Transaction created for account ID: ${accountId} with value: ${value}.`);
    res.status(201).send(transaction);
  } catch (error) {
    logger.error(`Error creating transaction for account ID: ${accountId} | Error: ${error.message}.`);
    res.status(500).send({ error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { categoryId, date, description, value, type } = req.body;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found.' });
    }

    transaction.categoryId = categoryId ?? transaction.categoryId;
    transaction.date = date ?? transaction.date;
    transaction.description = description ?? transaction.description;
    transaction.value = value ?? transaction.value;
    transaction.type = type ?? transaction.type;
    await transaction.save();

    logger.info(`Transaction updated for ID: ${transactionId}.`);
    res.status(200).send(transaction);
  } catch (error) {
    logger.error(`Error updating transaction ID: ${transactionId} | Error: ${error.message}.`);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found.' });
    }

    await transaction.destroy();
    logger.info(`Transaction deleted for ID: ${transactionId}.`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting transaction ID: ${transactionId} | Error: ${error.message}.`);
    res.status(500).send({ error: error.message });
  }
};

exports.listTransactionsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.findAll({
      where: { accountId },
      attributes: ['id', 'accountId', 'categoryId', 'date', 'description', 'value', 'type'],
    });

    if (!transactions.length) {
      return res.status(404).send({ message: 'No transactions found for this account.' });
    }

    logger.info(`Transactions listed for account ID: ${accountId}.`);
    res.status(200).send(transactions);
  } catch (error) {
    logger.error(`Error listing transactions for account ID: ${accountId} | Error: ${error.message}.`);
    res.status(500).send({ error: error.message });
  }
};
