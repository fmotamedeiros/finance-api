const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {jwtExpiration, jwtSecret} = require('../config/config');

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({where: {email}});
  if (!user) {
    throw new Error('User not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  return exports.generateToken(user);
};

exports.generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: jwtExpiration,
    },
  );
  return token;
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: 'Access denied.'});
    req.user = user;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({message: 'Access denied.'});
  }
  next();
};
