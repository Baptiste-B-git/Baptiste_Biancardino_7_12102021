// Imports
const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Posts router
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

// Comments router
router.post('/:id/commentPost', auth, postController.commentPost);
router.get('/:id/commentPost', auth, postController.getCommentPost);
router.delete('/deleteComment/:id', auth, postController.deleteComment);

module.exports = router;