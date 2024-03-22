const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize: typeof Sequelize, DataTypes: any): typeof Model => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models: typeof Model): void {
      // define association here
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User'
  })

  return User
}
