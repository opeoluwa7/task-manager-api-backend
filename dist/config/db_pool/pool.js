"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
// const DB_URL = env.DB_URL;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: env_1.env.DB_URL
});
exports.default = pool;
