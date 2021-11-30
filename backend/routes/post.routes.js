const router = require('express').Router();
const postController = require('../controllers/post.controller');


router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// comments
// router.post('/comment-post', postController.commentPost);
router.post('/commentPost', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.delete('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;