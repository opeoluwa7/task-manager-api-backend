"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const uploadImageUrl = async (image_url) => {
    try {
        const results = await pool_1.default.query('INSERT INTO tasks (image_url) VALUES($1) RETURNING image_url', [
            image_url
        ]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const updateImageUrl = async (image_url, user_id, task_id) => {
    try {
        const results = await pool_1.default.query('UPDATE tasks SET image_url = COALESCE($1, image_url) WHERE user_id = $2 and task_id = $3 RETURNING *', [
            image_url,
            user_id,
            task_id
        ]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const removeImageUrl = async (user_id, task_id) => {
    try {
        const results = await pool_1.default.query('UPDATE tasks SET image_url = NULL WHERE user_id = $2 and task_id = $3 RETURNING *', [
            user_id,
            task_id
        ]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
module.exports = {
    uploadImageUrl,
    updateImageUrl,
    removeImageUrl
};
