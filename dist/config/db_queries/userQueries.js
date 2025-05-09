"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const createUser = async (data) => {
    try {
        const result = await pool_1.default.query('INSERT INTO users (name, email, password, is_verified) VALUES($1, $2, $3, $4) RETURNING name, email, user_id, is_verified', [
            data.name,
            data.email,
            data.password,
            data.isVerified
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getUserWithEmail = async (data) => {
    try {
        const result = await pool_1.default.query('SELECT * FROM users WHERE email = $1', [data.email]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getUserWithId = async (data) => {
    try {
        const result = await pool_1.default.query('SELECT * FROM users WHERE user_id = $1', [data.user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const updateUser = async (data) => {
    try {
        const result = await pool_1.default.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [data.name, data.email, data.password, data.user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const deleteUser = async (data) => {
    try {
        const result = await pool_1.default.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [data.user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
module.exports = {
    createUser,
    getUserWithEmail,
    getUserWithId,
    updateUser,
    deleteUser
};
