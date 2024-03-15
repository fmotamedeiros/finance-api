const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const categoryController = require('../controllers/categoryController');
const {authenticateToken, isAdmin} = require('../../services/authService');

router.post('/users', userController.createUser);
router.get('/users', [authenticateToken, isAdmin], userController.listUsers);
router.get('/users/:userId/accounts', 
    authenticateToken, accountController.listAccountsByUser);
router.get('/users/:userId/categories', 
    authenticateToken, categoryController.listCategoriesByUser);

module.exports = router;
