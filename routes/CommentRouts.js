const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController.js');
const jwt = require('../config/JWT.js');

router.post('/createComment', commentController.createComment);

module.exports = router;