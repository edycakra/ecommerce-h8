'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Invoice extends Model {}
  Invoice.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    transactionDetails: {
      type: DataTypes.STRING
    },
    total: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.User)
  };
  return Invoice;
};