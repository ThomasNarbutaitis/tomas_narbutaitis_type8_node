require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function hashPassword(plainString) {
  return bcrypt.hashSync(plainString, 15);
}

function passwordsMatch(enteredPass, storedHashPass) {
  return bcrypt.compareSync(enteredPass, storedHashPass);
}

function generateJwtToken(payload) {
  if (!jwtSecret) throw new Error('generateJwtToken cannot find secret');
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

module.exports = {
  hashPassword,
  passwordsMatch,
  generateJwtToken,
};
