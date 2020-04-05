'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model {}
  Product.init ({
    name: {
      type: DataTypes.STRING,
      validate: {
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
    image_url: {
      type: DataTypes.STRING,
      validate: {
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
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: 1,
          msg: `input should be higher than 0`
        },
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
    stock: {
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
    }
  }, {
    sequelize
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
    Product.belongsToMany(models.User, {through: models.Cart})
  };
  return Product;
};