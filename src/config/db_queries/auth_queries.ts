import pool from '../db_pool/pool'


const createUser = async (name: string, email: string, password: string) => {
    try {
        const results = await pool.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING name, email, user_id', [name, email, password]);

        return results.rows[0]
    } catch (error) {
        return null
    }
}


const getUserDetails = async (email: string) => {
    try {

        const results = await pool.query('SELECT user_id, email, password FROM users WHERE email = $1', [email]);

        return results.rows[0]
    } catch (error) {
        return null
    }
}

export const authQueries = {
    createUser,
    getUserDetails
}
