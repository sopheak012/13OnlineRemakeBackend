const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema.is().min(6).has().digits(1).has().not().spaces();

const isStrongPassword = (password) => {
  return schema.validate(password);
};

module.exports = isStrongPassword;
