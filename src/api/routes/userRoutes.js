const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken, isAdmin} = require('../../services/authService');

router.post('/users', userController.createUser);
router.get('/users', [authenticateToken, isAdmin], userController.listUsers);

module.exports = router;
