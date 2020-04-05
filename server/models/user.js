'use strict';
const {hashPassword} = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const Op = sequelize.Sequelize.Op
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `name can not be empty`
        },
        notNull: {
          args: true,
          msg: `name can not be null`
        },
        isUnique() {
          return User.findOne({
            where: {
              [Op.and]: [{username: this.username}, {id: {[Op.ne]:this.id }}]
            }
          })
          .then(found => {
            if(found) {
              throw new Error(`username already exists`)
            }
          })
        }
      },
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `name can not be empty`
        },
        notNull: {
          args: true,
          msg: `name can not be null`
        },
        isEmail: {
          args: true,
          msg: `invalid email format`
        },
        isUnique() {
          return User.findOne({
            where: {
              [Op.and] : [{email: this.email}, {id: {[Op.ne]: this.id}}]
            }
          })
          .then(found => {
            if (found) {
              throw new Error (`email already exists`)
            }
          })
        }
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `name can not be empty`
        },
        notNull: {
          args: true,
          msg: `name can not be null`
        },
        len: {
          args: [6],
          msg: `minimum password length is 6`
        }
      },
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
    User.hasMany(models.Invoice)
    User.belongsToMany(models.Product, {through: models.Cart})
  };
  return User;
};