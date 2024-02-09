const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize: typeof Sequelize, DataTypes: any): any => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models: typeof Model): void {
      // define association here
    }
  }

  Cart.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart'
  })

  return Cart
}

export {}
