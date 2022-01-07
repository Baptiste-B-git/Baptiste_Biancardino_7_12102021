const UserModel = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports.signUp = async (req, res) => {
    console.log(req.body);
    let {email, username, password, bio, isAdmin, picture} = req.body
      const salt = await bcrypt.genSalt();

    try {
      password = await bcrypt.hash(password, salt);
        const user = await UserModel.create({
            email,
            username,
            password,
            bio,
            isAdmin,
            picture,
        });
        res.status(201).json({user})
    }
    catch(err) {
      console.log(err);
        res.status(200).send({ err })
    }
}

module.exports.signIn = async (req, res) =>{
  console.log(1);
  UserModel.findOne({where:{ email: req.body.email }})
  .then(user => {
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        console.log(3);
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
          // eror 404
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

exports.updatePicture = (req, res, next) => {

  const userObject = req.file ?

    {
      ...req.body.user,
      picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

module.exports.logout = (req, res) =>{

}


// // // (cours) JWT Login
// // exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         bcrypt.compare(req.body.password, user.password)
//           .then(valid => {
//             if (!valid) {
//               return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                 { userId: user._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' }
//               )
//             });
//           })
//           .catch(error => res.status(500).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
// //   };
// // // JWT login