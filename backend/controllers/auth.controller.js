const UserModel = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    let {email, username, password, isAdmin, picture} = req.body
      const salt = await bcrypt.genSalt();
      const schema = Joi.object({
        username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),

          email: Joi.string().email()
          .required(),
        
          password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });
    if (schema.validate(req.body).error){

      res.status(400).send(schema.validate(req.body).error.details)
    }else{
      try {
        password = await bcrypt.hash(password, salt);
          const user = await UserModel.create({
              email,
              username,
              password,
              isAdmin,
              picture,
          });
          res.status(201).json({user})
      }
      catch(err) {
        console.log("39");
          res.status(400).send({ err })
      }
    }
}

module.exports.signIn = async (req, res) =>{
  console.log(1);
  UserModel.findOne({where:{ email: req.body.email }})
  .then(user => {
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        console.log(3);
        if (!valid) {
          return res.status(404).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '31d' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
}

module.exports.logout = (req, res) =>{
  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/');
}