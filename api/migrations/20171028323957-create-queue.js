"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Queues", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			match_id: {
				type: Sequelize.INTEGER,
				references:{
					model:"Matches",
					key:"id"
				}
			},
			timestamp: {
				type: Sequelize.DATE
			},
			priority: {
				type: Sequelize.INTEGER
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
		return queryInterface.dropTable("Queues");
	}
};
