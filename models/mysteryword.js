'use strict';
module.exports = function(sequelize, DataTypes) {
    var MysteryWord = sequelize.define('MysteryWord', {
        mysteryword: DataTypes.STRING,
        guessesleft: DataTypes.INTEGER,
        lettersguessed: DataTypes.ARRAY(DataTypes.CHAR)
        },
        {
          classMethods: {
            associate: function(models) {
              // associations can be defined here
            }
          }
        });
      return MysteryWord;
    };
