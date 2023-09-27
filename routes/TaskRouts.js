const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController.js');
const jwt = require('../config/JWT.js');

router.post('/createTask',jwt.validateAdmin, taskController.createTask);
router.put('/updateTask', jwt.validateAdmin, taskController.editTask);
router.put('/assignTask', jwt.validateAdmin, taskController.assignTask);
router.delete('/:id', jwt.validateAdmin, taskController.deleteTask);
router.get('/', taskController.geTaskList);
router.get('/:reciever', taskController.findTasksByReceiver);
router.get('/searchTask/:description', taskController.searchTasks);

module.exports = router;
