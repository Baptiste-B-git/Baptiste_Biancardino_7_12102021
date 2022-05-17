// Imports
const UserModel = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Inscription du user - Exports
module.exports.signUp = async (req, res) => {
  console.log(req.body);
  let {email, username, password, isAdmin, picture} = req.body
    const salt = await bcrypt.genSalt();
    // Message d'erreur avec Joi
    const schema = Joi.object({
      username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.min': `"Nom d'utilisateur" doit avoir une longueur minimale de {#limit} caractères`,
      }),

      email: Joi.string().email()
      .required()
      .messages({
        'string.email': `L'adresse e-mail est incorrecte. Veuillez renseigner le champs (ex. : jean@gmail.fr)`,
      }),
        
      password: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': `"Mot de passe" doit avoir une longueur minimale de {#limit} caractères`,
      }),
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
      res.status(400).send({ err })
    }
  }
}

// Connexion du user
module.exports.signIn = async (req, res) =>{
  UserModel.findOne({where:{ email: req.body.email }})
  .then(user => {
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
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

// Déonnexion du user
module.exports.logout = (req, res) =>{
  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/');
}