'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    ownedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isUnpaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
