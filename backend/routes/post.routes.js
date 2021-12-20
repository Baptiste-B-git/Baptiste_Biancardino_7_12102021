const router = require('express').Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');

// Posts
router.get('/', auth, postController.readPost);
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

// Comments
router.post('/commentPost', auth, postController.commentPost);
router.put('/editCommentPost/:id', auth, postController.editCommentPost);
router.delete('/deleteCommentPost/:id', auth, postController.deleteCommentPost);


module.exports = router;