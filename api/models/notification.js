"use strict";
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
	let Code = sequelize.define("Notification", {
		id:{
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER,
	    allowNull: false,
			references: {
				model: User,
				key: "id",
			}
		},
		title: DataTypes.STRING,
		message: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('SUCCESS', 'ERROR', 'WARNING', 'INFORMATION')
    },
    isRead: {
    	type: DataTypes.BOOLEAN
    }
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Code;
};
