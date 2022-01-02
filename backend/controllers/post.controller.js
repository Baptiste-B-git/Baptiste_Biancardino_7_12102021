const PostModel = require('../models').Message;
const CommentModel = require('../models').Comment;
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
  console.log(req.body);
  const image = req.body.image;
  const newPost = new PostModel({
  UserId : UserId,
  content: content,
  image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
}); 
newPost
.save()
.then(() => res.status(201).json({ message: "Post enregistré" }))
.catch((error) => {
  console.log(error);
  res.status(400).json({ error })
});
};

module.exports.getCommentPost = (req, res) => {
  const postId = req.params.id;
  CommentModel.findAll({where:{messageId:postId}})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de retrouver les commentaires du post ${postId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération des commentaires du post" + postId
      });
    });
}

exports.getOnePost = (req, res, next) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de retrouver le post ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la récupération du post" + id
      });
    });

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

  exports.updatePicture = (req, res, next) => {
      
    const postObject = req.file ?
      {
        ...req.body.post,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
  
    Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Post modifié' }))
      .catch(error => res.status(400).json({ error }));
  };
// CRUD