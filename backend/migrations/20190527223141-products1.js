'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image1: {
          type: Sequelize.STRING
      },
      image2: {
          type: Sequelize.STRING
      },
      image3: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.TEXT
      },
      price: {
          type: Sequelize.DOUBLE(4,2)
      },
      category: {
          type: Sequelize.STRING
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};
