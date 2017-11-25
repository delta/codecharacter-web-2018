"use strict";
const Sequelize = require('sequelize');
let sequelize = null;
const dbCredentials = require('../config/config.json');
const dbUsername = dbCredentials['development']['username'];
const dbPassword = dbCredentials['development']['password'];
console.log(dbUsername, dbPassword);
(()=>{
	sequelize = new Sequelize('mysql://'+dbUsername+':'+dbPassword+'@localhost/codecharacter');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
})();


module.exports.sequelize = sequelize ;