const PostModel = require('../models').post;
const UserModel = require('../models').user;


// CRUD
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}
// Création du commentaire
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        idUSERS: req.body.idUSERS,
        title: req.body.title,
        content: req.body.content,
        attachment: [],
        likes: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}

// PUT mise à jour commentaire
module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unkknow : " + req.params.id);

    const updatedRecord = {
        content: req.body.content
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log();
        }
    )
}


// Supprimer un commentaire
module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unkknow : " + req.params.id);
    
    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log ("Delete error :" + err);
    });
}


// Like et Unlike
module.exports.likePost = (req, res) => {

}

module.exports.unlikePost = (req, res) => {

}

// CRUD