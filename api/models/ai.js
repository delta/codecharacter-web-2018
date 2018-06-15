"use strict";
module.exports = (sequelize, DataTypes) => {
	let Ai = sequelize.define("Ai", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		dll1: DataTypes.BLOB("long"),
		dll2: DataTypes.BLOB("long")
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Ai;
};
