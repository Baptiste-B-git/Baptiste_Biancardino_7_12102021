const PostModel = require('../models').Message;
const CommentModel = require('../models').Comment;
const test = require('../models');
const UserModel = require('../models').User;


// CRUD
module.exports.readPost = async (req, res) => {

    try{
      const posts = await PostModel.findAll();
      res.status(200).json(posts);
  
  }
  catch(err) {

      return res.status(500).json({ message: err});
  }
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

// Mise à jour post
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

// Ecrire un Commentaire
module.exports.commentPost = (req, res) => {
  const UserId = req.body.UserId;
  const content = req.body.content;
  const MessageId = req.body.MessageId;
  const newPost = new CommentModel({
  UserId : UserId,
  content: content,
  MessageId: MessageId,
}); 
newPost
.save()
.then(() => res.status(201).json({ message: "Commentaire enregistré" }))
.catch((error) => res.status(400).json({ error }));
};

// Modifier un Commentaire
// module.exports.editCommentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//   return res.status(400).send("ID unkknow : " + req.params.id);

//   try {
//     return PostModel.findById(
//       req.params.id,
//       (err, docs) => {
//         // theComment va correspondre au commentaire à éditer
//         const theComment = docs.comments.find((comment) =>
//           comment._id.equals(req.body.commentId)
//         )
//         // Dans le champ text
//         if (!theComment) return res.status(404).send('Comment not found')
//         theComment.text = req.body.text;

//         return docs.save((err) => {
//           if (!err) return res.status(200).send(docs);
//           return res.status(500).send(err);
//         })
//       }
//     )
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

exports.editCommentPost = (req, res) => {
  const id = req.params.id;
  CommentModel.update(req.body, {
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le commentaire a été mis à jour avec succès."
        });
      } else {
        res.send({
          message: "Impossible de mettre à jour le commentaire avec id=${id}."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur de mise à jour du commentaire avec id=" + id
      });
    });
}

// // Supprimer un Commentaire
// module.exports.deleteCommentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//   return res.status(400).send("ID unkknow : " + req.params.id);

//   try {
//     // findByIdAndUpdate delete d'un commentaire qui EST dans le post
//     return PostModel.findByIdAndUpdate(
//       // pointer le commentaire
//       req.params.id,
//       {
//         $pull: {
//           comments: {
//             _id: req.body.commentId,
//           },
//         },
//       },
//       { new: true},
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         else return res.status(400).send(err)
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };


exports.deleteCommentPost = (req, res) => {
  const id = req.params.id;

  PostModel.destroy({
    where: {id: id}
  })
    .then (num => {
      if (num == 1) {
        res.send({
          message: "Le commentaire a été supprimé avec succès !"
        });
      } else {
        res.send({
          message: 'Impossible de supprimer le commentaire avec id=${id}.'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le commentaire avec id=" + id
      });
    });
  };

// CRUD