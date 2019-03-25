'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dl = sequelize.define('Dl', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dl.associate = function(models) {
    // associations can be defined here
    models.Dl.belongsTo(models.SsiMarque, {
      foreignKey: {
        //allowNull : false
      }
    });
  };
  return Dl;
};