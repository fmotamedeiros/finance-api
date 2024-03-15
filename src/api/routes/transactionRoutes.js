const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticateAndAuthorizeTransaction, authenticateToken } = require('../../services/authService');

// Create a transaction (User must be authenticated and own the related account)
router.post('/accounts/:accountId/transactions', 
    authenticateToken, transactionController.createTransaction);

// Update a transaction (User must be authenticated and own the related account and transaction)
router.put('/transactions/:transactionId', 
  authenticateAndAuthorizeTransaction, transactionController.updateTransaction);

// Delete a transaction (User must be authenticated and own the related account and transaction)
router.delete('/transactions/:transactionId', 
  authenticateAndAuthorizeTransaction, transactionController.deleteTransaction);

module.exports = router;
