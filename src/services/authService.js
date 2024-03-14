const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Senha incorreta');
  }

  // Gerar o token
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

exports.generateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    role: user.role,
  }, process.env.JWT_SECRET, 
  {
    expiresIn: '1d',
  });
  return token;
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
      return res.sendStatus(403);
  }
  next();
};
