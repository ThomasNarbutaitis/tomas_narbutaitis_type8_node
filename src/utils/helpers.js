require('dotenv').config();
const bcrypt = require('bcrypt');

function hashPassword(plainString) {
  return bcrypt.hashSync(plainString, 15);
}

module.exports = {
  hashPassword,
};
