'use strict';
module.exports = (sequelize, DataTypes) => {
  const Df = sequelize.define('Df', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Df.associate = function(models) {
    // associations can be defined here
    models.Df.belongsTo(models.SsiMarque, {
      foreignKey: {
        //allowNull : false
      }
    });
  };
  return Df;
};