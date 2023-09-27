const db = require('../config/database.js');
const bcrypt = require('bcrypt');

exports.createTask = async (sender, receiver, deadline,task_tittle, description) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const insertTaskQuery =
    "INSERT INTO task (id, sender, receiver, created_date, deadline, task_tittle, description) VALUES (UUID(), ?, ?, ?, ?, ?, ?)";
  return db.query(insertTaskQuery, [
    sender,
    receiver,
    currentDate,
    deadline,
    task_tittle,
    description,
  ]);
};

exports.updateTask = async (id, deadline,task_tittle,description) => {
  const updateTaskQuery =
    "UPDATE task SET deadline=?,task_tittle=?, description=? WHERE id=?";
  return new Promise((resolve, reject) => {
    db.query(updateTaskQuery, [deadline,task_tittle,description, id], (err, result) => { 
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteTask = async (id) => {
    const deletTask = "DELETE FROM task WHERE id = ?";
    return await new Promise((resolve, reject) => {
      db.query(deletTask, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
};
  
exports.getTasks = async () => {
  const getTasksQuery = "SELECT t.id, t.receiver, t.sender, t.created_date, t.deadline, t.task_tittle, t.description, CASE WHEN t.sender IS NOT NULL THEN us.name ELSE NULL END AS senderUserName, CASE WHEN t.receiver IS NOT NULL THEN ur.name ELSE NULL END AS receiverUserName, a.name AS adminName FROM task t LEFT JOIN user us ON t.sender = us.id LEFT JOIN user ur ON t.receiver = ur.id JOIN admin a ON a.id = t.sender";
  return new Promise((resolve, reject) => {
    db.query(getTasksQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


exports.findTaskByID = (id) => {
  const checkIDQueryTask = "SELECT id FROM task WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(checkIDQueryTask, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  });
};
  
exports.findTasksByReceiver = (reciever) => {
  const findTasksQuery = "SELECT t.id, t.receiver, t.sender, t.created_date, t.deadline, t.task_tittle, t.description, CASE WHEN t.sender IS NOT NULL THEN us.name ELSE NULL END AS senderUserName, CASE WHEN t.receiver IS NOT NULL THEN ur.name ELSE NULL END AS receiverUserName, a.name AS adminName FROM task t LEFT JOIN user us ON t.sender = us.id LEFT JOIN user ur ON t.receiver = ur.id JOIN admin a ON a.id = t.sender WHERE t.receiver = ?";
  return new Promise((resolve, reject) => {
    db.query(findTasksQuery, [reciever], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.assignTask = async ( id , reciever) => {
  const assignTaskQuery =
    "UPDATE task SET receiver=? WHERE id=?";
  return await new Promise((resolve, reject) => {
    db.query(assignTaskQuery,[reciever,id],(err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.searchTasks = (description) => {
  const searchTaskQuery = "SELECT * FROM task WHERE description LIKE ?";
  return new Promise((resolve, reject) => {
    db.query(searchTaskQuery, [`%${description}%`], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};