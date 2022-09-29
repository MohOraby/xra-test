const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');

const { authenticate } = require('../middleware/authenticate');
const { checkOwner } = require('../middleware/checkOwner');

router.post('/create', [authenticate], postController.addPost);

router.get('/list', [authenticate], postController.getPosts);

router.post('/edit/:id', [authenticate, checkOwner], postController.editPost);

router.get('/delete/:id', [authenticate, checkOwner], postController.deletePost);

module.exports = router;