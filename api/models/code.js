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
		source: DataTypes.TEXT,
		dll1: DataTypes.BLOB('long'),
		dll2: DataTypes.BLOB('long'),
		status: DataTypes.ENUM( 'COMPILING', 'SUCCESS', 'ERROR'),
		error_log:  DataTypes.BLOB("long"),
		dll1_locked: DataTypes.BLOB("long"),
		dll2_locked: DataTypes.BLOB("long"),
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Code;
};
