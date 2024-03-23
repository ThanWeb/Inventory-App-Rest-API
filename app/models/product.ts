const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize: typeof Sequelize, DataTypes: any): any => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models: typeof Model): void {
      // define association here
    }
  }

  Product.init({
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastUpdatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capitalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sellPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product'
  })

  return Product
}
