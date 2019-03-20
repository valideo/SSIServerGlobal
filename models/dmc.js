'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dmc = sequelize.define('Dmc', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dmc.associate = function(models) {
    // associations can be defined here
    models.Dmc.belongsTo(models.SsiMarque, {
      foreignKey: {
        allowNull : false
      }
    });
  };
  return Dmc;
};