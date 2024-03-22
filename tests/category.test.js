const sequelize = require('../src/config/db');
const User = require('../src/models/userModel');
const Category = require('../src/models/categoryModel');

describe('Category Model', () => {
  let testUser;
  let testCategory;

  beforeAll(async () => {
    await sequelize.sync({force: true});

    // Creating a user before running category tests
    testUser = await User.create({
      name: 'Gregor Doe',
      email: 'gregor@example.com',
      password: 'password',
    });

    // Creating a test category
    testCategory = await Category.create({
      userId: testUser.id,
      name: 'Groceries',
    });
  });

  test('should create a new category successfully', async () => {
    const category = await Category.create({
      userId: testUser.id,
      name: 'Utilities',
    });

    expect(category.id).toBeDefined();
    expect(category.name).toBe('Utilities');
    expect(category.userId).toBe(testUser.id);
  });

  test('should not create a category without a name', async () => {
    await expect(Category.create({
      userId: testUser.id,
    })).rejects.toThrow();
  });

  test('should update a category successfully', async () => {
    await testCategory.update({name: 'Updated Category'});
    const updatedCategory = await Category.findByPk(testCategory.id);

    expect(updatedCategory.name).toBe('Updated Category');
  });

  test('should delete a category successfully', async () => {
    await testCategory.destroy();
    const categoryLookup = await Category.findByPk(testCategory.id);

    expect(categoryLookup).toBeNull();
  });

  test('should list all categories for a user', async () => {
    await Category.bulkCreate([
      {userId: testUser.id, name: 'Rent'},
      {userId: testUser.id, name: 'Savings'},
    ]);

    const categories = await Category.findAll({where: {userId: testUser.id}});
    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((category) => {
      expect(category.userId).toBe(testUser.id);
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
