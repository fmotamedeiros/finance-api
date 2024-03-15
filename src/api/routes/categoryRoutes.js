const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Adjust the path as necessary
const { authenticateAndAuthorizeCategory, authenticateToken } = require('../../services/authService'); // Adjust the path as necessary

// Create a category (User must be authenticated)
router.post('/users/:userId/categories', 
    authenticateToken, categoryController.createCategory);

// Update and delete a category (User must be authenticated and own the category)
router.put('/categories/:categoryId', 
    authenticateAndAuthorizeCategory, categoryController.updateCategory);
router.delete('/categories/:categoryId', 
    authenticateAndAuthorizeCategory, categoryController.deleteCategory);

module.exports = router;
