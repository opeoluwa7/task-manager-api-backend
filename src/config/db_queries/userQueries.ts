import CheckUserWithIdType from "../../types/userTypes/CheckUserWithIdType";
import CheckUserWithEmailType from "../../types/userTypes/CheckWithEmailType";
import CreateUserType from "../../types/userTypes/CreateUserType";
import DeleteUserType from "../../types/userTypes/DeleteUserType";
import UpdateUserType from "../../types/userTypes/UpdateUserType";
import pool from "../db_pool/pool";


const createUser = async (data: CreateUserType) => {
        try {
                const result = await pool.query('INSERT INTO users (name, email, password, is_verified) VALUES($1, $2, $3, $4) RETURNING name, email, user_id, is_verified', 
            [
                data.name, 
                data.email, 
                data.password, 
                data.isVerified
            ]);

                return result.rows[0]
            } catch (error) {
                throw error
            }
}


const getUserWithEmail = async (data: CheckUserWithEmailType) => {
        try {

                const result = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);

                return result.rows[0]
            } catch (error) {
                throw error
            }
}


const getUserWithId = async (data: CheckUserWithIdType) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [data.user_id]);


        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const updateUser = async (data: UpdateUserType) => {
    try {
        const result = await pool.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [data.name, data.email, data.password, data.user_id]);

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const deleteUser = async(data: DeleteUserType) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [data.user_id])

        return result.rows[0];
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
