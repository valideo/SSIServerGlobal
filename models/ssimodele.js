'use strict';
module.exports = (sequelize, DataTypes) => {
  const SsiModele = sequelize.define('SsiModele', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING,
    listModules: DataTypes.STRING,
    listDm: DataTypes.STRING,
    listDo: DataTypes.STRING,
    listDts: DataTypes.STRING,
    listDtv: DataTypes.STRING,
    listDmc: DataTypes.STRING,
    listDf: DataTypes.STRING,
    listDpa: DataTypes.STRING,
    listDl: DataTypes.STRING
  }, {});
  SsiModele.associate = function(models) {
    // associations can be defined here
    models.SsiModele.belongsTo(models.SsiMarque, {
      foreignKey: {
        allowNull : false
      }
    });
  };
  return SsiModele;
};