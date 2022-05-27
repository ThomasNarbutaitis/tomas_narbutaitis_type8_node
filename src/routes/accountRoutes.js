const express = require('express');
const { validateToken } = require('../middleware');
const { saveAccountDb, findAccountsById } = require('../model/accountModel');

const accountRoutes = express.Router();

// GET
accountRoutes.get('/accounts', validateToken, async (req, res) => {
  try {
    const usersArr = await findAccountsById(req.userId);
    res.json(usersArr);
  } catch (error) {
    console.log('error===', error);
    res.sendStatus(500);
  }
});

// POST account
accountRoutes.post('/accounts', validateToken, async (req, res) => {
  // console.log('userId ===', req.userId);
  const newAccount = {
    group_id: req.body.group_id,
    user_id: req.userId,
  };
  console.log('newAccount ===', newAccount);
  // res.json('trying to create an account');
  try {
    const saveResult = await saveAccountDb(
      newAccount.group_id,
      newAccount.user_id
    );
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no account created');
  } catch (error) {
    console.log('POST /accounts ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('account alredy exists');
      return;
    }
    res.sendStatus(500);
  }
});

module.exports = {
  accountRoutes,
};
