"use strict";
module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define("User", {
		id: {type:DataTypes.INTEGER, primaryKey:true},
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
		}
    
	}, {
		classMethods: {
			associate: function(/*models*/) {
				// associations can be defined here
			}
		}
	});
	return User;
};
