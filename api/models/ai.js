"use strict";
module.exports = (sequelize, DataTypes) => {
	let Ai = sequelize.define("Ai", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		dll1: DataTypes.STRING,
		dll2: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Ai;
};
