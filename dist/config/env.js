"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv").config();
exports.env = {
    PORT: process.env.PORT,
    JWTSECRET: process.env.JWTSECRET,
    JWTEXPTIME: process.env.JWTEXPTIME,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXP_TIME: process.env.JWT_REFRESH_EXP_TIME,
    RESET_TOKEN_SECRET: process.env.RESET_TOKEN_SECRET,
    RESET_TOKEN_EXP: process.env.RESET_TOKEN_EXP,
    DB_URL: process.env.DB_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_SECURE: process.env.EMAIL_SECURE,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
};
