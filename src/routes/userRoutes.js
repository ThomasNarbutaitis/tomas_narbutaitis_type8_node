const express = require('express');
const { getUsersDb, saveUserDb } = require('../model/userModel');
const { hashPassword } = require('../utils/helpers');

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

// POST register new user
userRoutes.post('/register', async (req, res) => {
  const newUser = req.body;
  newUser.password = hashPassword(newUser.password);
  try {
    const saveResult = await saveUserDb(
      newUser.full_name,
      newUser.email,
      newUser.password
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

module.exports = userRoutes;
