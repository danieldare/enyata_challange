'use strict';
module.exports = (sequelize, DataTypes) => {
  const Phonebook = sequelize.define('Phonebook', {
    firstname: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    mobilenumber: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {});
  Phonebook.associate = function(models) {
    // associations can be defined here
    Phonebook.belongsTo(models.User, {
      foreignKey: 'userId',
      // as: 'user',
    });
  };
  return Phonebook;
};