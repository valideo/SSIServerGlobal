'use strict';
module.exports = (sequelize, DataTypes) => {
  const Technicien = sequelize.define('Technicien', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING
  }, {});
  Technicien.associate = function(models) {
    // associations can be defined here
  };
  return Technicien;
};