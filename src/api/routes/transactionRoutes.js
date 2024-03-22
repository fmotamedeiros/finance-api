const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactionController');

const {
  authenticateAndAuthorizeTransaction,
  authenticateToken,
} = require('../../services/authService');

router.post(
  '/transactions',
  authenticateToken,
  transactionController.createTransaction,
);

/* To update and delete, user needs to be authenticated
and must own the related account and transactions */

router.put(
  '/transactions/:transactionId',
  authenticateAndAuthorizeTransaction,
  transactionController.updateTransaction,
);

router.delete(
  '/transactions/:transactionId',
  authenticateAndAuthorizeTransaction,
  transactionController.deleteTransaction,
);

module.exports = router;
