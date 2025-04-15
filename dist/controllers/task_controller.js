"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const task_queries_1 = __importDefault(require("../config/db/task_queries"));
const createNewTask = async (req, res, next) => {
    try {
        const task = req.body;
        task.priority = task.priority.toLowerCase();
        task.status = task.status.toLowerCase();
        task.user_id = req.user?.user_id;
        if (!task) {
            return res.status(400).json({
                success: false,
                error: "Empty fields, Please fill out form"
            });
        }
        if (!task.user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            });
        }
        const results = await task_queries_1.default.createTask(task.title, task.description, task.status, task.priority, task.deadline, task.user_id);
        if (!results) {
            return res.status(400).json({
                success: false,
                error: "Something went wrong"
            });
        }
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: results
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllTasks = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        const filters = req.query;
        let limit = 10;
        let page = 1;
        let offset = 0;
        if (!user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            });
        }
        const results = await task_queries_1.default.getTasks(user_id, filters, limit, offset);
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No tasks found!"
            });
        }
        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks: results
        });
    }
    catch (error) {
        next(error);
    }
};
const updateUserTask = async (req, res, next) => {
    try {
        const updatedTask = req.body;
        const user_id = req.user?.user_id;
        if (!updatedTask) {
            return res.status(400).json({
                success: false,
                error: "Required fields are missing. Please fill out form"
            });
        }
        updatedTask.priority = updatedTask.priority.toLowerCase();
        updatedTask.status = updatedTask.status.toLowerCase();
        if (!user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            });
        }
        const task_id = parseInt(req.params.id);
        const results = await task_queries_1.default.updateTask(updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.priority, updatedTask.deadline, user_id, task_id);
        if (!results) {
            return res.status(500).json({
                succcess: false,
                error: "Something went wrong"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated succesfully!",
            updatedTask: results
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteUserTask = async (req, res, next) => {
    try {
        const user_id = req.user?.user_id;
        if (!user_id) {
            return res.status(401).json({
                success: false,
                error: "User not identified, please login again"
            });
        }
        const task_id = parseInt(req.params.id);
        let task = await task_queries_1.default.getTaskById(user_id, task_id);
        if (!task) {
            return res.status(404).json({
                success: false,
                error: "Task not found in the database!"
            });
        }
        const result = await task_queries_1.default.deleteTask(task.task_id);
        if (!result) {
            return res.status(500).json({
                success: false,
                error: "Something went wrong"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
    }
    catch (error) {
        next(error);
    }
};
module.exports = {
    createNewTask,
    getAllTasks,
    updateUserTask,
    deleteUserTask
};
