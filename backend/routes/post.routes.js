const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Posts
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, multer, postController.readPost);
router.get('/:id', auth, multer, postController.getOnePost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, multer, postController.deletePost);

// Comments
router.post('/commentPost', auth, postController.commentPost);
router.put('/editCommentPost/:id', auth, postController.editCommentPost);
router.delete('/deleteCommentPost/:id', auth, postController.deleteCommentPost);


module.exports = router;