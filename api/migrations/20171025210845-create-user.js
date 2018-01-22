"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type:Sequelize.STRING
			},
			email: {
				type:Sequelize.STRING
			},
			pragyanId: {
				type:Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			password: {
				type: Sequelize.STRING
			},
			rating:{
				allowNull: false,
				type: Sequelize.INTEGER
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable("Users");
	}
};
