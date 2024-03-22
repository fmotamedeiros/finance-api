const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

const {
  authenticateAndAuthorizeCategory,
  authenticateToken,
} = require('../../services/authService');

router.post(
  '/categories',
  authenticateToken,
  categoryController.createCategory,
);

/* To updateand delete categories, user needs
to be authenticated and must own the related category */

router.put(
  '/categories/:categoryId',
  authenticateAndAuthorizeCategory,
  categoryController.updateCategory,
);

router.delete(
  '/categories/:categoryId',
  authenticateAndAuthorizeCategory,
  categoryController.deleteCategory,
);

module.exports = router;
