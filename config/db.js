const Sequelize = require("sequelize")

const dbUrl = 'postgres://fykmdbbd:8r5pntmT3UsVanACjcyQRNi8r0ZTkIpF@satao.db.elephantsql.com:5432/fykmdbbd'
const db = new Sequelize(dbUrl);

db.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
})
  .catch (error=>{
    console.error('Unable to connect to the database:', error);

  }) 
 module.exports = db