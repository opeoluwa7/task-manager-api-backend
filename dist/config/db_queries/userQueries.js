"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const createUser = async (name, email, password, isVerified) => {
    try {
        const result = await pool_1.default.query('INSERT INTO users (name, email, password, is_verified) VALUES($1, $2, $3, $4) RETURNING name, email, user_id, is_verified', [
            name,
            email,
            password,
            isVerified
        ]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getUserWithEmail = async (email) => {
    try {
        const result = await pool_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getUserWithId = async (user_id) => {
    try {
        const result = await pool_1.default.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const updateUser = async (newName, newEmail, encryptedPassword, user_id) => {
    try {
        const result = await pool_1.default.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [newName, newEmail, encryptedPassword, user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const deleteUser = async (user_id) => {
    try {
        const result = await pool_1.default.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
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
