const Account = require('../../models/accountModel');
const logger = require('../../config/logger');

exports.createAccount = async (req, res) => {
  try {
    const {userId, name, balance} = req.body;
    const account = await Account.create({
      userId,
      name,
      balance,
    });
    logger.info(`Account created for user ID: ${userId} with name: ${name}.`);
    res.status(201).send(account);
  } catch (error) {
    logger.error(`Error creating account. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const {accountId} = req.params;
    const {name, balance} = req.body;
    const account = await Account.findByPk(accountId);

    if (!account) {
      return res.status(404).send({message: 'Account not found.'});
    }

    account.name = name ?? account.name;
    account.balance = balance ?? account.balance;
    await account.save();

    logger.info(`Account updated for ID: ${accountId}.`);
    res.status(200).send(account);
  } catch (error) {
    logger.error(`Error updating account. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const {accountId} = req.params;
    const account = await Account.findByPk(accountId);

    if (!account) {
      return res.status(404).send({message: 'Account not found.'});
    }

    await account.destroy();
    logger.info(`Account deleted for ID: ${accountId}.`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting account. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.listAccountsByUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const accounts = await Account.findAll({
      where: {userId},
      attributes: ['id', 'userId', 'name', 'balance'],
    });
    logger.info(`Accounts listed for user ID: ${userId}.`);
    res.status(200).send(accounts);
  } catch (error) {
    logger.error(`Error listing accounts. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.listAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll({
      attributes: ['id', 'userId', 'name', 'balance'],
    });
    logger.info(`Accounts listed.`);
    res.status(200).send(accounts);
  } catch (error) {
    logger.error(`Error listing accounts | Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};
