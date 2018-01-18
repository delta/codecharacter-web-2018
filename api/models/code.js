"use strict";
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
	let Code = sequelize.define("Code", {
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.UUID,
	    allowNull: false,
	    unique: true,
			references: {
				model: User,
				key: "id",
			}
		},
		source: DataTypes.STRING,
		dll1: DataTypes.TEXT,
		dll2: DataTypes.TEXT ,
		status: DataTypes.STRING,
		error_log: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Code;
};
