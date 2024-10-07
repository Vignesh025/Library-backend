const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
  });
};

module.exports = generateToken;
