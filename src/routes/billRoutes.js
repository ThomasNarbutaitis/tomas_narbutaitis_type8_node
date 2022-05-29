const express = require('express');
const { validateToken } = require('../middleware');
const controller = require('../controllers/billController');

const billRoutes = express.Router();

// POST bills
billRoutes.post('/bills', validateToken, controller.createBill);

// GET /bills/:group_id
billRoutes.get('/bills/:group_id', validateToken, controller.getBills);

module.exports = billRoutes;
