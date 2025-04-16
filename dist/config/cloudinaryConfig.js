"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require("cloudinary").v2;
const env_1 = require("./env");
cloudinary.config({
    cloud_name: env_1.env.CLOUD_NAME,
    api_key: env_1.env.API_KEY,
    api_secret: env_1.env.API_SECRET
});
exports.default = cloudinary;
