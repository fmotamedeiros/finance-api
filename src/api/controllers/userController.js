const User = require('../../models/userModel');
const logger = require('../../config/logger');

exports.createUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const user = await User.create({
      name,
      email,
      password: password,
      role: 'user',
    });
    logger.info(`User created with email: ${email}.`);
    res.status(201).send(user);
  } catch (error) {
    logger.info(`Error creating user: ${email} | Error: ${error.message}.`);
    res.status(500).send({error: error.message});
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
};
