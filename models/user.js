const Sequelize = require("sequelize");
const db = require("../config/db");
const Credantial = require("./credential");

const User = db.define("user", {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  firstName: {
    type: Sequelize.STRING,
    field: "first_name",
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    field: "last_name",
    allowNull: false,
  },
  designation: {
    type: Sequelize.STRING,
    defaultValue: "Adminsator",
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: "+1 987 654 3210",
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Credantial,
      key: "email",
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  avatar: {
    type: Sequelize.STRING,
    field_name: "avatar_url",
  },
});

//  User.sync({ force: true })
//    .then(() => {
//      console.log("user table created");
//    })
//    .catch(err=>console.log(err));

module.exports = User;
