'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SsiModeles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idBrand: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'SsiMarques',
          key : 'id'
        },
      },
      refName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      listModules: {
        type: Sequelize.STRING
      },
      listDm: {
        type: Sequelize.STRING
      },
      listDo: {
        type: Sequelize.STRING
      },
      listDts: {
        type: Sequelize.STRING
      },
      listDtv: {
        type: Sequelize.STRING
      },
      listDmc: {
        type: Sequelize.STRING
      },
      listDf: {
        type: Sequelize.STRING
      },
      listDpa: {
        type: Sequelize.STRING
      },
      listDl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SsiModeles');
  }
};