'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model {}
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    ProductId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: `use number format`
        },
        notEmpty: {
          args: true,
          msg: `input can not be empty`
        },
        notNull: {
          args: true,
          msg: `input can not be null`
        }
      },
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize
  });
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product)
    Cart.belongsTo(models.User)
  };
  return Cart;
};