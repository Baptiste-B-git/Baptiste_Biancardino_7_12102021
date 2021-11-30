const PostModel = require('../models').Message;
const CommentModel = require('../models').Comment;
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
newPost
.save()
.then(() => res.status(201).json({ message: "Post enregistré" }))
.catch((error) => res.status(400).json({ error }));
};

// // PUT mise à jour post
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
  const UserId = req.body.UserId;
  const content = req.body.content;
  const messageId = req.body.messageId;
  const newPost = new CommentModel({
  UserId : UserId,
  content: content,
  messageId: messageId,
}); 
newPost
.save()
.then(() => res.status(201).json({ message: "Commentaire enregistré" }))
.catch((error) => res.status(400).json({ error }));
};



// module.exports.commentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unkknow : " + req.params.id);

//   try {
//     return PostModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         // On garde les commentaires d'avant pour se rajouter un nouveau commentaire dans la base de données
//         $push: {
//           comments: {
//             commentId: req.body.commentId,
//             commentPseudo: req.body.commentPseudo,
//             text: req.body.text,
//             timestamp: new Date().getTime(),
//           }
//         }
//       },
//       {new: true},
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         else return res.status(400).send(err)
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

// exports.commentPost = (req, res) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty !"
//     })
//     return;
//   }

//   // Create
//   const comments = {
//   UserId = req.body.UserId,
//   messageId = req.body.messageId,
//   content = req.body.content,
//   };

//   // Save Tutorial in the database
//   CommentModel.commentPost(comments)
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//       err.message || "Some error occured while creating the Tutorial."
//     });
//   }); 


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