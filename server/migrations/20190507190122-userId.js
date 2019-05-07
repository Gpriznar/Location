'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Locations', "userId", {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Locations', "userId")
  }
};
