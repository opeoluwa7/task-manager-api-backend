"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const createTask = async (title, description, status, priority, deadline, user_id) => {
    try {
        const result = await pool_1.default.query('INSERT INTO tasks (title, description, status, priority, deadline, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [
            title,
            description,
            status,
            priority,
            deadline,
            user_id
        ]);
        return result.rows[0];
    }
    catch (error) {
        return null;
    }
};
const getTasks = async (user_id, limit, offset) => {
    try {
        let query = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`;
        let values = [user_id];
        const result = await pool_1.default.query(query, values);
        return result.rows;
    }
    catch (error) {
        return null;
    }
};
const queryTasks = async (user_id, filters, limit, offset) => {
    try {
        let query = 'SELECT * FROM tasks WHERE user_id = $1 ';
        let values = [user_id];
        let paramIndex = 2;
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
        query += ` ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`;
        const result = await pool_1.default.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
};
const getTaskById = async (user_id, task_id) => {
    try {
        const query = 'SELECT * FROM tasks WHERE user_id = $1 and task_id = $2';
        const values = [user_id, task_id];
        const result = await pool_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const updateTask = async (title, description, status, priority, deadline, user_id, task_id) => {
    try {
        const query = 'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), priority = COALESCE($4, priority), deadline = COALESCE($5, deadline) WHERE user_id = $6 and task_id = $7 RETURNING *';
        const values = [title, description, status, priority, deadline, user_id, task_id];
        const result = await pool_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const deleteTask = async (task_id) => {
    try {
        const query = 'DELETE FROM tasks WHERE task_id = $1 RETURNING *';
        const value = [task_id];
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
