"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskQueries_1 = __importDefault(require("../../config/db_queries/taskQueries"));
const uploadQueries_1 = __importDefault(require("../../config/db_queries/uploadQueries"));
const createTask = async (title, description, status, priority, deadline, user_id) => {
    const result = await taskQueries_1.default.createTask(title, description, status, priority, deadline, user_id);
    return result;
};
const getAllTasks = async (user_id, limit = 20, offset = 0) => {
    const result = await taskQueries_1.default.getTasks(user_id, limit, offset);
    return result;
};
const queryAllTasks = async (user_id, filters, limit = 20, offset = 0) => {
    const result = await taskQueries_1.default.queryTasks(user_id, filters, limit, offset);
    return result;
};
const getTaskById = async (user_id, task_id) => {
    const result = await taskQueries_1.default.getTaskById(user_id, task_id);
    return result;
};
const updateTask = async (title, description, status, priority, deadline, user_id, task_id) => {
    const result = await taskQueries_1.default.updateTask(title, description, status, priority, deadline, user_id, task_id);
    return result;
};
const deleteTask = async (task_id) => {
    const result = await taskQueries_1.default.deleteTask(task_id);
    return result;
};
const uploadTaskImage = async (imgUrl) => {
    const result = await uploadQueries_1.default.uploadImageUrl(imgUrl);
    return result;
};
const checkImage = async (user_id, task_id) => {
    try {
        const result = await uploadQueries_1.default.checkImageIfExists(user_id, task_id);
        return result;
    }
    catch (error) {
        throw error;
    }
};
const updateTaskImage = async (imgUrl, user_id, task_id) => {
    const result = await uploadQueries_1.default.updateImageUrl(imgUrl, user_id, task_id);
    return result;
};
const removeTaskImage = async (user_id, task_id) => {
    const result = await uploadQueries_1.default.removeImageUrl(user_id, task_id);
    return result;
};
const taskFn = {
    createTask,
    getAllTasks,
    queryAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    checkImage,
    uploadTaskImage,
    updateTaskImage,
    removeTaskImage
};
exports.default = taskFn;
