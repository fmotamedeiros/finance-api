const sequelize = require('../src/config/db');
const User = require('../src/models/userModel');

beforeAll(async () => {
  await sequelize.sync({force: true});
});

test('create user with valid data', async () => {
  const user = await User.create({
    name: 'John',
    email: 'john@example.com',
    password: '123456'});
  expect(user.name).toEqual('John');
});

test('fail to create user with invalid data', async () => {
  expect.assertions(1);
  try {
    await User.create({name: '', email: 'invalidemail', password: '123'});
  } catch (error) {
    expect(error).toBeTruthy();
  }
});

test('list users', async () => {
  const users = await User.findAll();
  expect(users.length).toBeGreaterThan(0);
});

afterAll(async () => {
  await sequelize.close();
});
