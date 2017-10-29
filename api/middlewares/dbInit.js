const Sequelize = require('sequelize');
let sequelize = null;
const dbCredentials = require('../configs/dbconfig.js');
const dbUsername = dbCredentials.username;
const dbPassword = dbCredentials.password;
console.log(dbUsername, dbPassword);
module.exports.dbInit = ()=>{
	sequelize = new Sequelize('mysql://'+dbUsername+':'+dbPassword+'@localhost/codecharacter');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}
module.exports.sequelize = sequelize ;