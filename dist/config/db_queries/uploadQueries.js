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
        return null;
    }
};
module.exports = {
    uploadImageUrl
};
