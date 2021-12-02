const router = require('express').Router();
const postController = require('../controllers/post.controller');


// Posts
router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Comments
router.post('/commentPost', postController.commentPost);
router.put('/editCommentPost/:id', postController.editCommentPost);
router.delete('/deleteCommentPost/:id', postController.deleteCommentPost);


module.exports = router;