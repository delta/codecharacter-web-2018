"use strict";
module.exports = (sequelize, DataTypes) => {
	let Constant = sequelize.define("Constant", {
		key: DataTypes.STRING,
		id:{
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		value: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Constant;
};
