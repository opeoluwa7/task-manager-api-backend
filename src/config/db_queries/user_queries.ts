import pool from "../db_pool/pool";


const getUserAfterAuth = async (user_id: number) => {
    try {
        const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);


        return results.rows[0]
    } catch (error) {
        return null
    }
}

const updateUser = async (newName: string, newEmail: string, encryptedPassword: string, user_id: number) => {
    try {
        const results = await pool.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [newName, newEmail, encryptedPassword, user_id]);

        return results.rows[0]
    } catch (error) {
        return null
    }
}

const deleteUser = async(user_id: number) => {
    try {
        const results = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id])

        return results.rows[0];
    } catch (error) {
        return null
    }
}

export = {
    getUserAfterAuth,
    updateUser,
    deleteUser
}
