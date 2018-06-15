const Sequelize = require("sequelize");
let sequelize = null;
const dbCredentials = require("../config/config.json");
const dbUsername = dbCredentials["development"]["username"];
const dbPassword = dbCredentials["development"]["password"];
const dbHost = dbCredentials["development"]["host"];
const dbName = dbCredentials["development"]["database"];
module.exports.dbInit = ()=>{
	sequelize = new Sequelize("mysql://"+dbUsername+":"+dbPassword+"@"+dbHost+"/"+dbName);
	sequelize
		.authenticate()
		.then(() => {
			//console.log("Connection has been established successfully.");
		})
		.catch(err => {
			//console.error("Unable to connect to the database:", err);
			throw err;
		});
};
module.exports.sequelize = sequelize ;


