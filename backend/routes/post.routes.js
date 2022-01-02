const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Posts
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.readPost);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
// router.put('/post/picture/:id',auth,multer,postController.updatePicture);
// Comments
router.post('/:id/commentPost', auth, postController.commentPost);
router.get('/:id/commentPost', auth, postController.getCommentPost);
router.put('/editCommentPost/:id', auth, postController.editCommentPost);
router.delete('/deleteCommentPost/:id', auth, postController.deleteCommentPost);


module.exports = router;