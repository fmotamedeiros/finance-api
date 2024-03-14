const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const {authenticateAndAuthorizeAccount, authenticateToken} = require('../../services/authService');

// User must be authenticated and own the account
router.post('/accounts', authenticateToken, accountController.createAccount);
router.put('/accounts/:accountId',
  authenticateAndAuthorizeAccount, accountController.updateAccount);
router.delete('/accounts/:accountId',
  authenticateAndAuthorizeAccount, accountController.deleteAccount);

module.exports = router;
