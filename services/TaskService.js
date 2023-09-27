const taskModel = require('../repository/TaskRepo.js');
const userModel = require("../repository/UserRepo.js");
const jwt = require('../config/JWT.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
exports.createTask = async (sender, receiver, deadline, task_tittle, description) => {
  try {
    const admin = await userModel.findByIdAdmin(sender);
    const user = await userModel.findByIdUser(receiver);
    if(admin>0 && user>0){
      await taskModel.createTask(sender, receiver, deadline, task_tittle, description);
      return { message: "Task Created successfully" , status:true };
    }else{
      if(admin==0){
        return { message: "Incorrect admin user" , status:false };
      }
      if(user==0){
        return { message: "No user to assign" , status:false };
      }
    }
  } catch (error) {
    throw error;
  }
};

exports.editTask = async (id, deadline, task_tittle, description) => {
  try {
    const existingTask = await taskModel.findTaskByID(id);
    if (existingTask > 0) {
      await taskModel.updateTask(id, deadline, task_tittle, description);
      return { message: "Task Updated Successfully",status:true };
    } else {
      return { message: "task not found!",status:false };
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteTask = async (id) => {
  try {
    const existingTask = await taskModel.findTaskByID(id);
    if (existingTask > 0) {
      await taskModel.deleteTask(id);
      return { message: "Task Deleted Successfully", status:true };
    } else {
      return { message: "Task not found!" , status:false};
    }
  } catch (error) {
    throw error;
  }
};

exports.findTasksByReceiver = async (reciever) => {
  try {
    const existingTasks = await taskModel.findTasksByReceiver(reciever);
    return existingTasks;
  } catch (error) {
    throw error;
  }
};

exports.assignTask = async (id, reciever) => {
  try {
    const existingTask = await taskModel.findTaskByID(id);
    const user = await userModel.findByIdUser(reciever);
    if (existingTask > 0 && user > 0) {
      await taskModel.assignTask(id, reciever);
      return { message: "Task Assigned Successfully", status:true };
    } else {
      if(user==0){
        return { message: "user not found!", status:false };
      }
      if(existingTask==0){
        return { message: "Task not found!", status:false };
      }
    }
  } catch (error) {
    throw error;
  }
};

exports.searchTasks = async (description) => {
  try {
    const existingTasks = await taskModel.searchTasks(description);
    return existingTasks;
  } catch (error) {
    throw error;
  }
};

exports.getAllTasks = async () => {
  try {
    const existingTasks = await taskModel.getTasks();
    return existingTasks;
  } catch (error) {
    throw error;
  }
};