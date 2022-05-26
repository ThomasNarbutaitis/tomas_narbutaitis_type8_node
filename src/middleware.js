const Joi = require('joi');

async function validateUser(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().trim().min(5).required(),
    email: Joi.string().trim().email().lowercase()
      .required(),
    password: Joi.string().trim().min(5).max(15)
      .required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

module.exports = {
  validateUser,
};
