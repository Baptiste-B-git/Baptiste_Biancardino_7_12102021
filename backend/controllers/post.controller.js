const PostModel = require('../models/post');
const UserModel = require('../models').user;


// CRUD
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}
// Création du commentaire
module.exports.createPost = (req, res) => {
    const idUSERS =  req.body.idUSERS;

    const content = req.body.content;
    const attachment = [];
    const likes =  []
const newPost = new PostModel({
   idUSERS: idUSERS,

        content: content,
        attachment: attachment,
        likes: likes
  }); 

newPost 
.save()
.then(() => res.status(201).json({ message: "post enregistré" }))
.catch((error) => res.status(400).json({ error }));
};


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