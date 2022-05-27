const express = require('express');
const { validateToken } = require('../middleware');
const controller = require('../controllers/accountController');

const accountRoutes = express.Router();

// GET accounts(groups)
accountRoutes.get('/accounts', validateToken, controller.getAccounts);

// POST account
accountRoutes.post('/accounts', validateToken, controller.createAccount);

module.exports = accountRoutes;
