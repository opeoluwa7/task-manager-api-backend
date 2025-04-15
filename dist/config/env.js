"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv").config();
exports.env = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME,
    DB_URL: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
    SECURE: process.env.SECURE,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE
};
