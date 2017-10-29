const Sequelize = require('sequelize');
let sequelize = null;
module.exports.dbInit = ()=>{
	sequelize = new Sequelize('mysql://root:root@localhost/sample');
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