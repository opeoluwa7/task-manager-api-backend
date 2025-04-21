import pool from "../db_pool/pool";


const createUser = async (name: string, email: string, password: string, isVerified: Boolean) => {
        try {
                const results = await pool.query('INSERT INTO users (name, email, password, is_verified) VALUES($1, $2, $3, $4) RETURNING name, email, user_id, is_verified', 
            [
                name, 
                email, 
                password, 
                isVerified
            ]);

                return results.rows[0]
            } catch (error) {
                throw error
            }
}


const getUserWithEmail = async (email: string) => {
        try {

                const results = await pool.query('SELECT user_id, email, password FROM users WHERE email = $1', [email]);

                return results.rows[0]
            } catch (error) {
                throw error
            }
}


const getUserWithId = async (user_id: Number) => {
    try {
        const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);


        return results.rows[0]
    } catch (error) {
        throw error
    }
}

const updateUser = async (newName: string, newEmail: string, encryptedPassword: string, user_id: Number) => {
    try {
        const results = await pool.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [newName, newEmail, encryptedPassword, user_id]);

        return results.rows[0]
    } catch (error) {
        throw error
    }
}

const deleteUser = async(user_id: Number) => {
    try {
        const results = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id])

        return results.rows[0];
    } catch (error) {
        throw error
    }
}

export = {
    createUser,
    getUserWithEmail,
    getUserWithId,
    updateUser,
    deleteUser
}
