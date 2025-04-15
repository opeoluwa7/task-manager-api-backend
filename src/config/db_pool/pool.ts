import { env } from "../env";
// const DB_URL = env.DB_URL;

import {Pool} from "pg";


const pool = new Pool({
    connectionString: env.DB_URL
});

export default pool
