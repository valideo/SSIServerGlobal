'use strict';
module.exports = (sequelize, DataTypes) => {
  const SsiMarque = sequelize.define('SsiMarque', {
    brandName: DataTypes.STRING
  }, {});
  SsiMarque.associate = function(models) {
    // associations can be defined here

    models.SsiMarque.hasMany(models.SsiModele);
    models.SsiMarque.hasMany(models.Dtv);
    models.SsiMarque.hasMany(models.Dts);
    models.SsiMarque.hasMany(models.Dpa);
    models.SsiMarque.hasMany(models.Do);
    models.SsiMarque.hasMany(models.Dmc);
    models.SsiMarque.hasMany(models.Dm);
    models.SsiMarque.hasMany(models.Dl);
    models.SsiMarque.hasMany(models.Df);
  };
  return SsiMarque;
};