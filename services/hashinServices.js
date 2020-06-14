const bcrypt = require("bcrypt");

const saltRounds = 10;


exports.generateHashSync = plainTextPassword => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};
exports.compareHash = (plainTextPassword, passwordHash) => {
  return  bcrypt.compareSync(plainTextPassword,passwordHash)
 
};
