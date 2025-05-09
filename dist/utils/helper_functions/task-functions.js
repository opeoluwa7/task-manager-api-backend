"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskQueries_1 = __importDefault(require("../../config/db_queries/taskQueries"));
const uploadQueries_1 = __importDefault(require("../../config/db_queries/uploadQueries"));
const createTask = async (data) => {
    const result = await taskQueries_1.default.createTask(data);
    return result;
};
const getAllTasks = async (data) => {
    const result = await taskQueries_1.default.getTasks(data);
    return result;
};
const queryAllTasks = async (data) => {
    const result = await taskQueries_1.default.queryTasks(data);
    return result;
};
const getTaskById = async (data) => {
    const result = await taskQueries_1.default.getTaskById(data);
    return result;
};
const updateTask = async (data) => {
    const result = await taskQueries_1.default.updateTask(data);
    return result;
};
const deleteTask = async (data) => {
    const result = await taskQueries_1.default.deleteTask(data);
    return result;
};
const updateTaskImage = async (data) => {
    const result = await uploadQueries_1.default.updateImageUrl(data);
    return result;
};
const removeTaskImage = async (data) => {
    const result = await uploadQueries_1.default.removeImageUrl(data);
    return result;
};
const taskFn = {
    createTask,
    getAllTasks,
    queryAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskImage,
    removeTaskImage
};
exports.default = taskFn;
