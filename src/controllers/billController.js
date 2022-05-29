const { saveBillDb, findBillsByGroupId } = require('../model/billModel');

const createBill = async (req, res) => {
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
};

const getBills = async (req, res) => {
  const { group_id } = req.params;
  try {
    const billsArr = await findBillsByGroupId(group_id);
    res.json(billsArr);
  } catch (error) {
    console.log('error===', error);
    res.sendStatus(500);
  }
};

module.exports = {
  createBill,
  getBills,
};
