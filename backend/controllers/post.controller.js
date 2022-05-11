const PostModel = require('../models').Message;
const db = require('../models/index')
const CommentModel = require('../models').Comment;
const UserModel = require('../models').User;

// CRUD
// Création du post
module.exports.createPost = (req, res) => {
  const UserId = req.userId;
  const content = req.body.content;
  let data = {
    UserId : UserId,
    content: content,
  };
  if (req.file){
    data.image= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  console.log(req.body);
  console.log(req.file);
  const newPost = new PostModel(data); 
newPost
.save()
.then(() => res.status(201).json({ message: "Post enregistré" }))
.catch((error) => {
  console.log(error);
  res.status(400).json({ error })
});
};

// Tous les posts
module.exports.getAllPosts = async (req, res) => {
  PostModel.findAll({
    order: [['createdAt', 'DESC']],
    include:[
      {
        model: db.User,
        attributes: ["username","id"],
      },
      {
        model: db.Comment,
        include: [
          {
            model: db.User,
            attributes: ["username","id"],
          },
        ]
      }
    ]
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
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

// Mise à jour du post
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

// -------------- Commentaires -------------------
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

module.exports.commentPost = (req, res) => {
  const UserId = req.userId;
  const content = req.body.content;
  const messageId = req.params.id;
  console.log(content);
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

// Supprimer un commentaire
exports.deleteComment = (req, res) => {
  const id = req.params.id;
  CommentModel.destroy({
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