const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize: typeof Sequelize, DataTypes: any): any => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models: typeof Model): void {
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
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction'
  })

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'ownedBy'
    })
  }

  return Transaction
}

export {}
