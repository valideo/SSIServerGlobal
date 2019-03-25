'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dtv = sequelize.define('Dtv', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Dtv.associate = function(models) {
    // associations can be defined here
    models.Dtv.belongsTo(models.SsiMarque, {
      foreignKey: {
        //allowNull : false
      }
    });
  };
  return Dtv;
};