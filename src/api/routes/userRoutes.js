const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const categoryController = require('../controllers/categoryController');

const {
  authenticateToken,
  isAdmin,
} = require('../../services/authService');

router.post('/users', userController.createUser);

/* To update and delete, user needs to be authenticated
and must own the related accounts or categories */

router.get(
  '/users/:userId/accounts',
  authenticateToken,
  accountController.listAccountsByUser,
);

router.get(
  '/users/:userId/categories',
  authenticateToken,
  categoryController.listCategoriesByUser,
);

/* Only admin users can list all the users accounts */

const adminUsers = [authenticateToken, isAdmin];
router.get('/users', adminUsers, userController.listUsers);

module.exports = router;
