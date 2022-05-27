const express = require('express');
const { validateToken } = require('../middleware');
const { saveAccountDb } = require('../model/accountModel');

const accountRoutes = express.Router();

accountRoutes.get('/accounts', validateToken, async (req, res) => {
  res.json('trying to get accounts');
});

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
