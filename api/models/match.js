'use strict';
module.exports = (sequelize, DataTypes) => {
  var Match = sequelize.define('Match', {
    player_id1: DataTypes.INTEGER,
    player_id2: DataTypes.INTEGER,
    ai_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Match;
};