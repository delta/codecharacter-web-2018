"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.createTable("Matches", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			player_id1: {
				type: Sequelize.INTEGER,
				references:{
					model: "Users",
					key:"id"
				}
			},
			player_id2: {
				type: Sequelize.INTEGER,
				references:{
					model: "Users",
					key:"id"
				}
			},
			ai_id: {
				type: Sequelize.INTEGER,
				references:{
					model:"Ais",
					key:"id"
				}
			},
			status: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("Matches");
	}
};
