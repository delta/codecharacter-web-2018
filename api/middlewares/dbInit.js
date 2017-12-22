const Sequelize = require("sequelize");
let sequelize = null;
const dbCredentials = require("../config/config.js");
const dbUsername = dbCredentials[process.env.stage]["username"];
const dbPassword = dbCredentials[process.env.stage]["password"];
module.exports.dbInit = ()=>{
	sequelize = new Sequelize("mysql://"+dbUsername+":"+dbPassword+"@localhost/codecharacter");
	sequelize
		.authenticate()
		.then(() => {
			console.log("Connection has been established successfully.");
		})
		.catch(err => {
			console.error("Unable to connect to the database:", err);
		});
};
module.exports.sequelize = sequelize ;


