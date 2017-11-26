"use strict";
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
	let Code = sequelize.define("Code", {
		user_id: {
			primary: true,
			type:DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			}
		},
		source: DataTypes.STRING,
		dll1: DataTypes.STRING,
		dll2: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Code;
};
