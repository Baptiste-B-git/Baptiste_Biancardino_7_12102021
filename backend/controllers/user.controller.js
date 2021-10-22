const UserModel = require('../models').User;

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

// DELETE user
module.exports.deleteUser = async (req, res) => {
    try{
        const user = await UserModel.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur inexistant !'});
        await user.destroy();
        res.status(200).json({ message: "successfully deleted."});
    } catch (err){
        console.log(err);
        return res.status(500).json({ message: err});
    }
}