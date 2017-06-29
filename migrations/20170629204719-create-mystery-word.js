'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('MysteryWords', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            mysteryword: {
              type: Sequelize.STRING
            },
            guessesleft: {
              type: Sequelize.INTEGER
            },
            lettersguessed: {
              type: Sequelize.ARRAY(Sequelize.CHAR)
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
        down: function(queryInterface, Sequelize) {
          return queryInterface.dropTable('MysteryWords');
        }
    };
