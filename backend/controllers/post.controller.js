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
  const likes =  [];
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

// module.exports.createPost = async (req, res) => {
//   const newPost = new postModel({
//     idUSERS: req.body.idUSERS,
//     title: req.body.title,
//     content = req.body.content;
//     attachment = [];
//     likes =  [];
// });

//   try {
//     const post = await newPost.save();
//     return res.status(201).json(post);
//   } catch (err) {
//     return res.status(400).send(err);
//   }};


// PUT mise à jour commentaire
module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unkknow : " + req.params.id);

    const updatedRecord = {
        content: req.body.content
    }

    PostModel.findByIdAndUpdate(
      // id de l'article
        req.params.id,
        // mise à jour le message du user updaterecord
        { $set: updateRecord }, 
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log();
        }
    )
};


// Supprimer un commentaire
module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unkknow : " + req.params.id);
    
    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log ("Delete error :" + err);
    });
};


// Like et Unlike
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likes: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  };

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.body.id },
        },
        { new: true },
        (err, docs) => {
          if (err) return res.status(400).send(err);
        }
      );
      await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $pull: { likes: req.params.id },
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else return res.status(400).send(err);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
};
// CRUD