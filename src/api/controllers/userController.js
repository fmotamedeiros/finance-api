const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: 'user'
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ erro: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
      const users = await User.findAll({
          attributes: ['id', 'name', 'email']
      });
      res.status(200).send(users);
  } catch (error) {
      res.status(500).send({ erro: error.message });
  }
};