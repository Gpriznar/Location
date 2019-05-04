'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Locations.associate = function(models) {
    // associations can be defined here
  };
  return Locations;
};