const {
  getGroupsById,
  saveAccountDb,
  findAccountByUserAndGroupId,
} = require('../model/accountModel');

const getAccounts = async (req, res) => {
  try {
    const accountsArr = await getGroupsById(req.userId);
    res.json(accountsArr);
  } catch (error) {
    console.log('error===', error);
    res.sendStatus(500);
  }
};

const createAccount = async (req, res) => {
  // console.log('userId ===', req.userId);
  const newAccount = {
    group_id: req.body.group_id,
    user_id: req.userId,
  };
  console.log('newAccount ===', newAccount);
  try {
    const checkAccount = await findAccountByUserAndGroupId(
      newAccount.user_id,
      newAccount.group_id
    );
    if (checkAccount.length > 0) {
      res.status(400).json('Account already exists');
      return;
    }
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
  }
  res.sendStatus(500);
};

module.exports = {
  getAccounts,
  createAccount,
};
