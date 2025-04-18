"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const task_queries_1 = __importDefault(require("../config/db_queries/task_queries"));
const task_schema_1 = require("../schemas/task_schema");
const createNewTask = async (req, res, next) => {
    try {
        const value = task_schema_1.createTaskSchema.safeParse(req.body);
        if (!value.success)
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        const task = value.data;
        const task_deadline = new Date(task.deadline);
        const user_id = req.user?.user_id;
        const results = await task_queries_1.default.createTask(task.title, task.description, task.status, task.priority, task_deadline, user_id);
        if (!results)
            return res.status(500).json({
                success: false,
                error: "Error creating task"
            });
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
        let limit = 20;
        let offset = 0;
        const results = await task_queries_1.default.getTasks(user_id, filters, limit, offset);
        if (results?.length === 0) {
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
        const value = task_schema_1.updateTaskSchema.safeParse(req.body);
        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            });
        }
        const updatedTask = value.data;
        const user_id = req.user?.user_id;
        const task_id = Number(req.params.id);
        const updatedTask_deadline = new Date(updatedTask.deadline);
        const results = await task_queries_1.default.updateTask(updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.priority, updatedTask_deadline, user_id, task_id);
        const afterUpdateTask = await task_queries_1.default.getTaskById(user_id, task_id);
        if (!afterUpdateTask)
            return res.status(404).json({
                success: false,
                error: "Task not found in the database."
            });
        if (!results) {
            return res.status(500).json({
                succcess: false,
                error: "Error updating task. Something went wrong, try again"
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
        const task_id = Number(req.params.id);
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
                error: "Error deleting task. Something went wrong"
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
