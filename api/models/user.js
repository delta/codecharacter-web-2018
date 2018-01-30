"use strict";
module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define("User", {
		id: {
			type:DataTypes.INTEGER, 
			primaryKey:true,
			autoIncrement: true
		},
		name: {
			type:DataTypes.STRING
		},
		email: {
			type:DataTypes.STRING
		},
		pragyanId: {
			type:DataTypes.INTEGER
		},
		password:{
			type:DataTypes.STRING
		},
		rating:{
			allowNull: false,
			type: DataTypes.INTEGER
		},
		is_active: DataTypes.BOOLEAN,
		activation_key: DataTypes.STRING,
		activation_deadline: DataTypes.DATE,
		nationality: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return User;
};
