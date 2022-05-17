// Imports
const UserModel = require('../models').User;
const postModel = require('../models').Message;
const commentModel = require('../models').Comment;

// Afficher tous les users
module.exports.getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.findAll();
        res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ message: err});
    }
}

// Afficher un seul user
module.exports.userInfo = async (req, res) => {
    try{ 
        const user = await UserModel.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur inexistant !'});
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err});
    }
}; 

// Supprimer le user
module.exports.deleteUser = async (req, res) => {
    try{
        const user = await UserModel.findByPk(req.params.id);
        postModel.destroy({ where: { userId: req.params.id } })
        commentModel.destroy({ where: { userId: req.params.id } })
        user.destroy({ where: { userId: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaires, posts et compte supprimés !' }))
        .catch(error => res.status(400).json({ error }));
    }
    catch (err){
        return res.status(500).json({ message: err});
    }
}