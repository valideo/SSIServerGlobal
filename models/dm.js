'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dm = sequelize.define('Dm', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dm.associate = function(models) {
    // associations can be defined here
    models.Dm.belongsTo(models.SsiMarque, {
      foreignKey: {
        allowNull : false
      }
    });
  };
  return Dm;
};