'use strict';
module.exports = (sequelize, DataTypes) => {
  let ai = sequelize.define('ai', {
    dll1: DataTypes.STRING,
    dll2: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ai;
};