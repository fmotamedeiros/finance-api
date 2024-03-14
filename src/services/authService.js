const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Account = require('../models/accountModel');
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

exports.authenticateAndAuthorizeAccount = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({message: 'Token is required.'});

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.status(403).json({message: 'Access denied.'});

    // Authorization step to verify account ownership
    try {
      const {accountId} = req.params;
      if (!accountId) {
        throw new Error('Account ID is required.');
      }

      const account = await Account.findByPk(accountId);
      if (!account) {
        throw new Error('Account not found.');
      }

      if (account.userId !== decoded.id) {
        throw new Error('User not authorized for this account.');
      }

      // User is authenticated and authorized to access the account
      req.user = decoded;
      next();
    } catch (authError) {
      res.status(403).json({message: authError.message});
    }
  });
};


exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({message: 'Access denied.'});
  }
  next();
};
