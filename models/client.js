'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    models.Client.hasMany(models.Site);
  };
  return Client;
};