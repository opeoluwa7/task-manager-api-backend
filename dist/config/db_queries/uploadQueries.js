"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const pool_1 = __importDefault(require("../db_pool/pool"));
const uploadImageUrl = async (image_url, user_id) => {
    try {
        const results = await pool_1.default.query('INSERT INTO images (image_url, user_id) VALUES($1, $2) RETURNING *', [
            image_url,
            user_id
        ]);
        return results.rows[0];
    }
    catch (error) {
        return null;
    }
};
const getImages = async (user_id) => {
    try {
        const results = await pool_1.default.query('SELECT image_url FROM images WHERE user_id = $1', [
            user_id
        ]);
        return results.rows;
    }
    catch (error) {
        return null;
    }
};
module.exports = {
    uploadImageUrl,
    getImages
};
