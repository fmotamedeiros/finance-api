const { authenticateUser } = require('../../services/authService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};