'use strict';
module.exports = (sequelize, DataTypes) => {
  const Do = sequelize.define('Do', {
    idBrand: DataTypes.INTEGER,
    refName: DataTypes.STRING
  }, {});
  Do.associate = function(models) {
    // associations can be defined here
    models.Do.belongsTo(models.SsiMarque, {
      foreignKey: {
        //allowNull : false
      }
    });
  };
  return Do;
};