"use strict";
const Match = require("./match");
module.exports = (sequelize, DataTypes) => {
	let Queue = sequelize.define("Queue", {
		match_id: {
			primaryKey:true,
			type:DataTypes.INTEGER,
			references: {
				model: Match,
				key: "id",
			}
		},
		timestamp: DataTypes.DATE,
		priority: DataTypes.INTEGER
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Queue;
};
