const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Posts
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

// Comments
router.post('/:id/commentPost', auth, postController.commentPost);
router.get('/:id/commentPost', auth, postController.getCommentPost);
router.put('/editCommentPost/:id', auth, postController.editCommentPost);
router.delete('/deleteComment/:id', auth, postController.deleteComment);

module.exports = router;