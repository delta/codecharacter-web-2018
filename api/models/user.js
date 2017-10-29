'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};