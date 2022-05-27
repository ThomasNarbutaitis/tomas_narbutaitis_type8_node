const { saveUserDb, findUserByEmail } = require('../model/userModel');
const {
  hashPassword,
  passwordsMatch,
  generateJwtToken,
} = require('../utils/helpers');

const userRegister = async (req, res) => {
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
};

const userLogin = async (req, res) => {
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
};

module.exports = {
  userRegister,
  userLogin,
};
