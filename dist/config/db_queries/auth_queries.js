"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueries = void 0;
const pool_1 = __importDefault(require("../db_pool/pool"));
const createUser = async (name, email, password) => {
    try {
        const results = await pool_1.default.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING name, email, user_id', [name, email, password]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
const getUserDetails = async (email) => {
    try {
        const results = await pool_1.default.query('SELECT user_id, email, password FROM users WHERE email = $1', [email]);
        return results.rows[0];
    }
    catch (error) {
        throw error;
    }
};
exports.authQueries = {
    createUser,
    getUserDetails
};
