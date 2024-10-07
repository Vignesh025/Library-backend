const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10; // You can adjust the salt rounds for your needs
  return await bcrypt.hash(password, saltRounds);
};

module.exports = hashPassword;
