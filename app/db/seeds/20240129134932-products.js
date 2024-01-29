'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Products', [
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Hoodie KKK',
        capitalPrice: 200000,
        sellPrice: 300000,
        stock: 20,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Gigi Minotaur',
        capitalPrice: 5000000,
        sellPrice: 10000000,
        stock: 2,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Bunga Bankai',
        capitalPrice: 200000,
        sellPrice: 350000,
        stock: 30,
        unit: 'tangkai',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Dragon ball',
        capitalPrice: 1000000,
        sellPrice: 3000000,
        stock: 7,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Death Note',
        capitalPrice: 10000000,
        sellPrice: 20000000,
        stock: 1,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Pedang Kunasagi',
        capitalPrice: 150000,
        sellPrice: 200000,
        stock: 10,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Buku Tulis Kiky 38',
        capitalPrice: 3000,
        sellPrice: 4000,
        stock: 50,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        createdBy: 1,
        lastUpdatedBy: 1,
        name: 'Sky Guardian Helmet',
        capitalPrice: 3500,
        sellPrice: 5000,
        stock: 35,
        unit: 'pcs',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
