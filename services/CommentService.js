const commentModel = require('../repository/CommentRepo.js');
const jwt = require('../config/JWT.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
exports.createComment = async (task_id, user_id, description) => {
  try {
    await commentModel.createComment(task_id, user_id, description);
    return { message: "Comment added successfully", status :true };
  } catch (error) {
    throw error;
  }
};