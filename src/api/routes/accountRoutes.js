const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');
const transactionController = require('../controllers/transactionController');

const {
  authenticateAndAuthorizeAccount,
  authenticateToken,
  isAdmin,
} = require('../../services/authService');

router.post('/accounts', authenticateToken, accountController.createAccount);

/* To update, delete, and list transactions, user needs
to be authenticated and must own the related account */

router.put(
  '/accounts/:accountId',
  authenticateAndAuthorizeAccount,
  accountController.updateAccount,
);

router.delete(
  '/accounts/:accountId',
  authenticateAndAuthorizeAccount,
  accountController.deleteAccount,
);

router.get(
  '/accounts/:accountId/transactions',
  authenticateAndAuthorizeAccount,
  transactionController.listTransactionsByAccount,
);

/* Only admin users can list all the accounts */

const adminUsers = [authenticateToken, isAdmin];
router.get('/accounts', adminUsers, accountController.listAccounts);

module.exports = router;
