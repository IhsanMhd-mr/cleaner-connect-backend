const db = require('../config/database.js');
const bcrypt = require('bcrypt');

exports.createComment = async (task_id, user_id, description) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const insertCommentQuery =
    "INSERT INTO comment (id, task_id, user_id,created_date, description) VALUES (UUID(), ?, ?, ?, ?)";
  return db.query(insertCommentQuery, [
    task_id,
    user_id,
    currentDate,
    description,
  ]);
};