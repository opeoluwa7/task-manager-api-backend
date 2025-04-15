"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
// const DB_URL = env.DB_URL;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: env_1.env.DB_HOST,
    database: env_1.env.DB_NAME,
    port: Number(env_1.env.DB_PORT),
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD
});
exports.default = pool;
