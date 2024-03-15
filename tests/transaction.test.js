const sequelize = require('../src/config/db');
const User = require('../src/models/userModel');
const Account = require('../src/models/accountModel');
const Category = require('../src/models/categoryModel');
const Transaction = require('../src/models/transactionModel');

describe('Transaction Model', () => {
    let testUser, testAccount, testCategory;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        // Creating user, account, and category before running transaction tests
        testUser = await User.create({
            name: 'David',
            email: 'david@example.com',
            password: 'password'
        });

        testAccount = await Account.create({
            userId: testUser.id,
            name: 'Davids Account',
            balance: 1000.00,
        });

        testCategory = await Category.create({
            userId: testUser.id,
            name: 'Groceries'
        });
    });

    test('should create a new transaction successfully', async () => {
        const transaction = await Transaction.create({
            accountId: testAccount.id,
            categoryId: testCategory.id,
            date: '2023-01-01',
            description: 'Supermarket',
            value: 200.00,
            type: 'expense',
        });

        expect(transaction.id).toBeDefined();
        expect(transaction.description).toBe('Supermarket');
        expect(transaction.value).toBe('200.00');
        expect(transaction.type).toBe('expense');
    });

    test('should not create a transaction with invalid value', async () => {
        await expect(Transaction.create({
            accountId: testAccount.id,
            categoryId: testCategory.id,
            date: '2023-01-02',
            description: 'Invalid Expense',
            value: 'invalid',
            type: 'expense',
        })).rejects.toThrow();
    });

    test('should update a transaction successfully', async () => {
        let transaction = await Transaction.create({
            accountId: testAccount.id,
            categoryId: testCategory.id,
            date: '2023-01-03',
            description: 'Online Subscription',
            value: 100.00,
            type: 'expense',
        });

        await transaction.update({ value: 120.00, description: 'Updated Subscription' });
        transaction = await Transaction.findByPk(transaction.id);

        expect(transaction.value).toBe('120.00');
        expect(transaction.description).toBe('Updated Subscription');
    });

    test('should delete a transaction successfully', async () => {
        const transaction = await Transaction.create({
            accountId: testAccount.id,
            categoryId: testCategory.id,
            date: '2023-01-04',
            description: 'Book Purchase',
            value: 50.00,
            type: 'expense',
        });

        await transaction.destroy();
        const transactionLookup = await Transaction.findByPk(transaction.id);

        expect(transactionLookup).toBeNull();
    });

    test('should correctly update account balance after transaction creation', async () => {
      let account = await Account.create({
        userId: testUser.id,
        name: 'Test Account 1',
        balance: 500.00,
      });
      
      const transactionValue = 200.00;
      await Transaction.create({
        accountId: account.id,
        categoryId: testCategory.id,
        date: new Date(),
        description: 'Grocery shopping',
        value: transactionValue,
        type: 'expense',
      });
  
      // Reload balance with new value
      await account.reload();

      expect(account.balance).toBe('300.00');
    });
  
    test('should correctly update account balance after transaction update', async () => {
      let account = await Account.create({
        userId: testUser.id,
        name: 'Test Account 2',
        balance: 500.00,
      });
      
      let transaction = await Transaction.create({
        accountId: account.id,
        categoryId: testCategory.id,
        date: new Date(),
        description: 'Utilities',
        value: 100.00,
        type: 'expense',
      });
  
      // Updating the transaction value
      await transaction.update({ value: 150.00 });
  
      await account.reload();
      expect(account.balance).toBe('350.00');
    });

    test('should correctly update account balance after transaction deletion', async () => {
      let account = await Account.create({
        userId: testUser.id,
        name: 'Test Account 3',
        balance: 500.00,
      });
      
      const transaction = await Transaction.create({
        accountId: account.id,
        categoryId: testCategory.id,
        date: new Date(),
        description: 'Unnecessary expense',
        value: 50.00,
        type: 'expense',
      });
  
      // Delete transaction
      await transaction.destroy();
  
      await account.reload();
      expect(account.balance).toBe('500.00');
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
