'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      models.User.hasMany(models.Message);
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

// // crypter le password
// const bcrypt = require('bcrypt');

// userSchema.pre("save", async function(next){
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // auth.controller.js
// // Au moment de se log, récupération de l'email et du password puis bcrypt compare les deux crypt et il valide si c'est bon
// user.Schema.statics.login = async function (email, password){
//   const user = await this.findOne ({ email });
//   if (user){
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth){
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email')
// };


