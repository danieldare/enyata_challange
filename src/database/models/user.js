'use strict';

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    username: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    
  });


  User.beforeCreate(user => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  });

  User.associate = function(models) {
    
    // associations can be defined here
    User.hasMany(models.Phonebook, {
      foreignKey: 'userId',
      as: 'phonebook',
      onDelete: 'cascade',
      hooks: true,
    });
  };


  User.prototype.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
