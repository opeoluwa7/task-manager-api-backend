import { env } from "../env";
// const DB_URL = env.DB_URL;

import {Pool} from "pg";


const pool = new Pool({
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD
});

export default pool
