const Category = require('../../models/categoryModel');
const logger = require('../../config/logger');

exports.createCategory = async (req, res) => {
  try {
    const {userId, name} = req.body;
    const category = await Category.create({
      userId,
      name,
    });
    logger.info(`Category created: ${name} for userId: ${userId}.`);
    res.status(201).send(category);
  } catch (error) {
    logger.error(`Error creating category. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const {name} = req.body;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).send({message: 'Category not found.'});
    }

    category.name = name;
    await category.save();

    logger.info(`Category updated: ${categoryId} to name: ${name}.`);
    res.status(200).send(category);
  } catch (error) {
    logger.error(`Error updating category. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).send({message: 'Category not found.'});
    }

    await category.destroy();
    logger.info(`Category deleted: ${categoryId}.`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting category. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.listCategoriesByUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const categories = await Category.findAll({
      where: {userId},
      attributes: ['id', 'userId', 'name'],
    });

    logger.info(`Categories listed for userId: ${userId}.`);
    res.status(200).send(categories);
  } catch (error) {
    logger.error(`Error listing categories. Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};
