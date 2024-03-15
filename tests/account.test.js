const sequelize = require('../src/config/db');
const User = require('../src/models/userModel');
const Account = require('../src/models/accountModel');

describe('Account Model', () => {

  let testAccount;
  let testUser;

  beforeAll(async () => {
    await sequelize.sync({force: true});
  
    // Creating an user account before running tests
    testUser = await User.create({
      name: 'Mary',
      email: 'mary@example.com',
      password: '123456'});

    // Creating an account before running tests
    testAccount = await Account.create({
      userId: 1,
      name: 'Test Account',
      balance: 500.00,
    });
  
  });

  test('should create a new account successfully', async () => {
    const account = await Account.create({
      userId: 1,
      name: 'Savings Account',
      balance: 1000.00,
    });

    expect(account.id).toBeDefined();
    expect(account.name).toBe('Savings Account');
    expect(account.balance).toBe('1000.00');
  });

  test('should not create an account with invalid balance', async () => {
    await expect(Account.create({
      userId: 1,
      name: 'Invalid Account',
      balance: 'invalid',
    })).rejects.toThrow();
  });

  test('should update an account successfully', async () => {
    const updatedBalance = 2000.00;
    await testAccount.update({ balance: updatedBalance });
    expect(testAccount.balance).toBe(updatedBalance);
  });

  test('should delete an account successfully', async () => {
    await testAccount.destroy();
    const accountLookup = await Account.findByPk(testAccount.id);
    expect(accountLookup).toBeNull();
  });

  test('should list all accounts for a user', async () => {
    await Account.bulkCreate([
      { userId: 1, name: 'Account 1', balance: 100 },
      { userId: 1, name: 'Account 2', balance: 200 }
    ]);

    const accounts = await Account.findAll({ where: { userId: 1 } });
    expect(accounts.length).toBeGreaterThan(0);
    accounts.forEach(account => {
      expect(account.userId).toBe(1);
    });
  });

  test('should not create an account without a user ID', async () => {
    await expect(Account.create({
      name: 'No User Account',
      balance: 300.00,
    })).rejects.toThrow();
  });

  test('should not create an account without a name', async () => {
    await expect(Account.create({
      userId: 1,
      balance: 300.00,
    })).rejects.toThrow();
  });
  
});

afterAll(async () => {
  await sequelize.close();
});
