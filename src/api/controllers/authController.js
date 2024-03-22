const {authenticateUser} = require('../../services/authService');
const logger = require('../../config/logger');
const {jwtExpiration} = require('../../config/config');

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const authenticatedUser = await authenticateUser(email, password);
    logger.info(`Login successful for user: ${email}.`);
    res.json({
      token: authenticatedUser.token,
      user: authenticatedUser.userDetails,
      expiresIn: jwtExpiration,
    });
  } catch (error) {
    logger.error(`Login attempt failed for user. Error: ${error.message}.`);
    if (error.message === 'Invalid credentials.') {
      return res.status(401).json({message: 'Invalid credentials.'});
    }
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({message: 'An unexpected error occurred.'});
  }
};
