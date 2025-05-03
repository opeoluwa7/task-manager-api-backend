"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const updateImageUrl = async (image_url, user_id, task_id) => {
    try {
        const result = await pool_1.default.query('UPDATE tasks SET image_url = COALESCE($1, image_url) WHERE user_id = $2 and task_id = $3 RETURNING *', [
            image_url,
            user_id,
            task_id
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getImageUrl = async (user_id, task_id) => {
    try {
        const result = await pool_1.default.query('SELECT image_url FROM tasks WHERE user_id = $1 and task_id = $2', [
            user_id,
            task_id
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const removeImageUrl = async (user_id, task_id) => {
    try {
        const result = await pool_1.default.query('UPDATE tasks SET image_url = NULL WHERE user_id = $1 and task_id = $2 RETURNING *', [
            user_id,
            task_id
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
module.exports = {
    getImageUrl,
    updateImageUrl,
    removeImageUrl
};
