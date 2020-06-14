const Sequelize = require("sequelize");
const { generateHashSync } = require("../services/hashinServices");
const db =require("../config/db")
const Credential = db.define(
  "credentail",
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
     
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value){
          this.setDataValue("password", generateHashSync(value))
      }
    }
  } 
);

// Credential.sync({ force: false })
// .then(() => {
//   console.log("table created");
// }).catch(console.error);


module.exports = Credential;