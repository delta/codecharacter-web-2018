"use strict";
const User = require("./user");
const Ai = require("./ai");
module.exports = (sequelize, DataTypes) => {
	let Match = sequelize.define("Match", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true
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
		status: DataTypes.ENUM( 'EXECUTING', 'SUCCESS', 'ERROR'),
		log: DataTypes.BLOB("long"),
		error_log:  DataTypes.BLOB("long"),
		'player1_dlog': DataTypes.BLOB('long'),
		'player2_dlog': DataTypes.BLOB('long')
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return Match;
};
