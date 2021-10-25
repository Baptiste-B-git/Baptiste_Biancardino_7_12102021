const UserModel = require('../models').User;
const jwt = require('jsonwebtoken');

// création du token et expiration + décodage du token
// maxAge= temps avant déconnexion du user
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.RANDOM_TOKEN_SECRET, {
        expiresIn: maxAge
    })
};


// (cours) JWT Login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
// JWT login


module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const {email, username, password, bio, isAdmin} = req.body

    try {
        const user = await UserModel.create({
            email,
            username,
            password,
            bio,
            isAdmin
        });
        res.status(201).json({user})
    }
    catch(err) {
        res.status(200).send({ err })
    }
}

module.exports.signIn = async (req, res) =>{
    const {email, password} = req.body

    try{
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge:maxAge});
        res.status(200).json({ user: user._id})
    } catch(err){
        res.status(200).json(err);
    }
}

module.exports.logout = (req, res) =>{

}