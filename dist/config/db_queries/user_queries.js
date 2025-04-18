"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const getUserAfterAuth = async (user_id) => {
    try {
        const results = await pool_1.default.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        return results.rows[0];
    }
    catch (error) {
        return null;
    }
};
const updateUser = async (newName, newEmail, encryptedPassword, user_id) => {
    try {
        const results = await pool_1.default.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [newName, newEmail, encryptedPassword, user_id]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const deleteUser = async (user_id) => {
    try {
        const results = await pool_1.default.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
        return results.rows[0];
    }
    catch (error) {
        return null;
    }
};
module.exports = {
    getUserAfterAuth,
    updateUser,
    deleteUser
};
