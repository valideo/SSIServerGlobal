'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    idClient: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    respName: DataTypes.STRING,
    respFonc: DataTypes.STRING,
    respTel: DataTypes.STRING,
    respEmail: DataTypes.STRING,
    nContrat: DataTypes.STRING
  }, {});
  Site.associate = function(models) {
    // associations can be defined here

    models.Site.belongsTo(models.Client,{
      foreignKey :{
        allowNull: false
      }
    })
  };
  return Site;
};