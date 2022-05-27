const express = require('express');
const { validateUserRegister, validateUserLogin } = require('../middleware');
const controller = require('../controllers/userController');

const userRoutes = express.Router();

// POST register
userRoutes.post('/register', validateUserRegister, controller.userRegister);

// POST login
userRoutes.post('/login', validateUserLogin, controller.userLogin);

module.exports = userRoutes;
