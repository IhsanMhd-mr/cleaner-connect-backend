const taskService = require('../services/TaskService.js');

exports.createTask = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "data is missing in the request body" });
  }
  const { sender, receiver, deadline, task_tittle, description } = req.body;
  try {
    const result = await taskService.createTask(
      sender,
      receiver,
      deadline,
      task_tittle,
      description
    );
    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status:false });
  }
};

exports.editTask = async (req,res) => {
  const { id, deadline, task_tittle, description } = req.body;
  try {
    const result = await taskService.editTask(id, deadline, task_tittle, description);
    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" , status:false});
  }
}

exports.deleteTask = async (req,res) => {
const id = req.params.id;
  try {
    const result = await taskService.deleteTask(id);
    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status:false });
  }
}

exports.findTasksByReceiver = async (req, res, next) => {
  try {
    const reciever = req.params.reciever;
    const existingTasks = await taskService.findTasksByReceiver(reciever);

    if (existingTasks.length > 0) {
      res
        .status(200)
        .json({ tasks: existingTasks, message: "Tasks found successfully" , status:true});
    } else {
      res.status(400).json({ message: "No tasks found for the receiver", status:false });
    }
  } catch (error) {
    next(error);
  }
};

exports.assignTask = async (req,res) => {
  const { id, reciever } = req.body;
  try {
    const result = await taskService.assignTask(id, reciever);
    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status:false });
  }
}

exports.searchTasks = async (req, res, next) => {
  try {
    const description = req.params.description;
    const existingTasks = await taskService.searchTasks(description);

    if (existingTasks.length > 0) {
      res.status(200).json({ tasks: existingTasks, message: "Tasks found" , status:true});
    } else {
      res.status(400).json({ message: "No matching tasks", status:false });
    }
  } catch (error) {
    next(error);
  }
};

exports.geTaskList = async (req, res) => {
  try {
    const existingTasks = await taskService.getAllTasks();

    if (existingTasks.length > 0) {
      res
        .status(200)
        .json({ tasks: existingTasks, message: "Tasks found successfully" , status:true});
    } else {
      res.status(400).json({ message: "No tasks found for the receiver", status:false });
    }
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status:false });
  }
};