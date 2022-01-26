const UserModel = require('../models').User;
const postModel = require('../models').Post;


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
        await postModel.destroy({ where: { user_id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Posts supprimés !' }))
        .catch(error => res.status(400).json({ error }));

        await user.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'User supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    }
    catch (err){
        console.log(err);
        return res.status(500).json({ message: err});
    }
}


// // Première phase deleteUser
// module.exports.deleteUser = async (req, res) => {
//     try{
//         await postModel.destroy({ where: { user_id: req.params.id } })

//         const user = await UserModel.findByPk(req.params.id);

//         if (!user) return res.status(400).json({ message: 'Utilisateur inexistant !'});
//         await user.destroy();
//         res.status(200).json({ message: "successfully deleted."});
//     }
//     catch (err){
//         console.log(err);
//         return res.status(500).json({ message: err});
//     }
// }

// // Test suppression de compte G
// exports.deleteUser = (req, res, next) => {
//     User.findOne({ where: { id: req.params.id } })
//       .then(user => {
  
  
//         Post.destroy({ where: { user_id: req.params.id } })
//           .then(() => res.status(200).json({ message: 'Posts supprimés !' }))
//           .catch(error => res.status(400).json({ error }));
  
//         User.destroy({ where: { id: req.params.id } })
//           .then(() => res.status(200).json({ message: 'User supprimé !' }))
//           .catch(error => res.status(400).json({ error }));
  
//       })
//       .catch(error => res.status(500).json({ error }));
//   };