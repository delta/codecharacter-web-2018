"use strict";
module.exports = (sequelize, DataTypes) => {
	let ai = sequelize.define("ai", {
		id: DataTypes.INTEGER,
		dll1: DataTypes.STRING,
		dll2: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return ai;
};
