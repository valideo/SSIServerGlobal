'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dpa = sequelize.define('Dpa', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dpa.associate = function(models) {
    // associations can be defined here
    models.Dpa.belongsTo(models.SsiMarque, {
      foreignKey: {
        allowNull : false
      }
    });
  };
  return Dpa;
};