const express = require('express');
const { validateToken } = require('../middleware');
const { saveBillDb } = require('../model/billModel');

const billRoutes = express.Router();

// POST account
billRoutes.post('/bills', validateToken, async (req, res) => {
  const newBill = req.body;
  try {
    const saveResult = await saveBillDb(
      newBill.group_id,
      newBill.amount,
      newBill.description
    );
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no bill created');
  } catch (error) {
    console.log('POST /bills ===', error);
  }
  res.sendStatus(500);
});

module.exports = billRoutes;
