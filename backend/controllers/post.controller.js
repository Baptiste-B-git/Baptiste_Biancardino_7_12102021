const PostModel = require('../models').Message;
const test = require('../models');
const UserModel = require('../models').User;


// CRUD
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}
// Création du post
module.exports.createPost = (req, res) => {
  const UserId = req.body.UserId;
  const content = req.body.content;
  const attachment = req.body.attachment;
  const newPost = new PostModel({
  UserId : UserId,
  content: content,
  attachment: attachment,
}); 

// try {
//   const post = await newPost.save();
//   return res.status(201).json(post);
// } catch (err) {
//   return res.status(400).send(err);
// }
// };

newPost
.save()
.then(() => res.status(201).json({ message: "Post enregistré" }))
.catch((error) => res.status(400).json({ error }));
};

// // PUT mise à jour post
// module.exports.updatePost = (req, res) => {
//     if (req.params.id.isValid(req.params.id))
//         return res.status(400).send("ID unkknow : " + req.params.id);

//     const updatedRecord = {
//         content: req.body.content
//     }

//     PostModel.findByIdAndUpdate(
//       // id de l'article
//         req.params.id,
//         // mise à jour le message du user updaterecord
//         { $set: updateRecord }, 
//         { new: true },
//         (err, docs) => {
//             if (!err) res.send(docs);
//             else console.log();
//         }
//     )
// };

exports.updatePost = (req, res) => {
  const id = req.params.id;
  PostModel.update(req.body, {
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le post a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: "Impossible de mettre à jour le post avec id=${id}."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur de mise à jour du post avec id=" + id
      });
    });
}

// Supprimer un post
// module.exports.deletePost = (req, res) => {
//     if (!ObjectID.isValid(req.params.id))
//         return res.status(400).send("ID unkknow : " + req.params.id);
    
//     PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
//         if (!err) res.send(docs);
//         else console.log ("Delete error :" + err);
//     });
// };

exports.deletePost = (req, res) => {
  const id = req.params.id;

  PostModel.destroy({
    where: {id: id}
  })
    .then (num => {
      if (num == 1) {
        res.send({
          message: "Le post a été supprimé avec succès !"
        });
      } else {
        res.send({
          message: 'Impossible de supprimer le post avec id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le post avec id=" + id
      });
    });
  };

// Commentaires
module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unkknow : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        // On garde les commentaires d'avant pour se rajouter un nouveau commentaire dans la base de données
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          }
        }
      },
      {new: true},
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err)
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unkknow : " + req.params.id);

  try {
    return PostModel.findById(
      req.params.id,
      (err, docs) => {
        // theComment va correspondre au commentaire à éditer
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        )
        // Dans le champ text
        if (!theComment) return res.status(404).send('Comment not found')
        theComment.text = req.body.text;

        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        })
      }
    )
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unkknow : " + req.params.id);

  try {
    // findByIdAndUpdate delete d'un commentaire qui EST dans le post
    return PostModel.findByIdAndUpdate(
      // pointer le commentaire
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true},
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err)
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
// End commentiares

// CRUD