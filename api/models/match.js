"use strict";
const User = require("./user");
const Ai = require("./ai");
module.exports = (sequelize, DataTypes) => {
	let Match = sequelize.define("Match", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		player_id1: {
			type:DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			}
		},
		player_id2: {
			type:DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			}
		},
		ai_id: {
			type:DataTypes.INTEGER,
			references: {
				model: Ai,
				key: "id",
			}
		},
		status: DataTypes.STRING,
		log: DataTypes.STRING,
		error_log: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Match;
};
