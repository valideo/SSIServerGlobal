'use strict';
module.exports = (sequelize, DataTypes) => {
  const SsiMarque = sequelize.define('SsiMarque', {
    brandName: DataTypes.STRING
  }, {});
  SsiMarque.associate = function(models) {
    // associations can be defined here

    models.SsiMarque.hasMany(models.SsiModele,{
      onDelete: 'CASCADE',
      hooks : true
    });
    models.SsiMarque.hasMany(models.Dtv,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Dts,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Dpa,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Do,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Dmc,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Dm,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Dl,{onDelete: 'CASCADE'});
    models.SsiMarque.hasMany(models.Df,{onDelete: 'CASCADE'});
  };
  return SsiMarque;
};