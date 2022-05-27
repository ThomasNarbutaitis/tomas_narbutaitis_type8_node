const express = require('express');
const { validateUserRegister, validateUserLogin } = require('../middleware');
const {
  getUsersDb,
  saveUserDb,
  findUserByEmail,
} = require('../model/userModel');
const {
  hashPassword,
  passwordsMatch,
  generateJwtToken,
} = require('../utils/helpers');

const userRoutes = express.Router();

// GET users
userRoutes.get('/users', async (req, res) => {
  try {
    const usersArr = await getUsersDb();
    res.json(usersArr);
  } catch (error) {
    console.log('error===', error);
    res.sendStatus(500);
  }
});

// POST register
userRoutes.post('/register', validateUserRegister, async (req, res) => {
  const newUser = req.body;
  newUser.password = hashPassword(newUser.password);
  try {
    const saveResult = await saveUserDb(
      newUser.full_name,
      newUser.email,
      newUser.password,
    );
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no user created');
  } catch (error) {
    console.log('POST /register ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('user alredy exists');
      return;
    }
    res.sendStatus(500);
  }
});

// POST login
userRoutes.post('/login', validateUserLogin, async (req, res) => {
  // res.json('trying to login');
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  const foundUserArray = await findUserByEmail(loginEmail);
  const foundUser = foundUserArray[0];
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  if (!passwordsMatch(loginPassword, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = generateJwtToken(payload);
  res.json({ success: true, token });
});

module.exports = userRoutes;
