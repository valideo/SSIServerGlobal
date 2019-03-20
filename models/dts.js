'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dts = sequelize.define('Dts', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dts.associate = function(models) {
    // associations can be defined here
    models.Dts.belongsTo(models.SsiMarque, {
      foreignKey: {
        allowNull : false
      }
    });
  };
  return Dts;
};