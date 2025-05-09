"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const createTask = async (data) => {
    try {
        const result = await pool_1.default.query('INSERT INTO tasks (title, description, status, priority, deadline, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            data.title,
            data.description,
            data.status,
            data.priority,
            data.deadline,
            data.user_id
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getTasks = async (data) => {
    try {
        let query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC LIMIT ${data.limit} OFFSET ${data.offset}`;
        let values = [data.user_id];
        const result = await pool_1.default.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
};
const queryTasks = async (data) => {
    try {
        let query = 'SELECT * FROM tasks WHERE user_id = $1 ';
        let values = [data.user_id];
        let paramIndex = 2;
        let filters = data.filters;
        if (filters.status) {
            query += `AND status = $${paramIndex} `;
            values.push(filters.status);
            paramIndex++;
        }
        if (filters.priority) {
            query += `AND priority = $${paramIndex} `;
            values.push(filters.priority);
            paramIndex++;
        }
        query += ` ORDER BY created_at ASC LIMIT ${data.limit} OFFSET ${data.offset}`;
        const result = await pool_1.default.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
};
const getTaskById = async (data) => {
    try {
        const query = 'SELECT * FROM tasks WHERE user_id = $1 and task_id = $2';
        const values = [data.user_id, data.task_id];
        const result = await pool_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const updateTask = async (data) => {
    try {
        const query = 'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), deadline = COALESCE($5, deadline) WHERE user_id = $6 and task_id = $7 RETURNING *';
        const values = [data.title, data.description, data.status, data.priority, data.deadline, data.user_id, data.task_id];
        const result = await pool_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const deleteTask = async (data) => {
    try {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const value = [data.task_id];
        const result = await pool_1.default.query(query, value);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
};
module.exports = {
    createTask,
    getTasks,
    queryTasks,
    getTaskById,
    updateTask,
    deleteTask
};
