'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      lastUpdatedBy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      capitalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sellPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};