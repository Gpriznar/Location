'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return Location;
};
