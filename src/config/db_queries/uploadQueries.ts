import GetImageType from "../../types/taskTypes/GetImageType";
import RemoveImageType from "../../types/taskTypes/RemoveImageType";
import UpdateImageType from "../../types/taskTypes/UpdateImageType";
import pool from "../db_pool/pool";

const updateImageUrl = async (data: UpdateImageType) => {
    try {
        const result = await pool.query('UPDATE tasks SET image_url = COALESCE($1, image_url) WHERE user_id = $2 and task_id = $3 RETURNING *', [
            data.image_url,
            data.user_id,
            data.task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const getImageUrl = async (data: GetImageType) => {
    try {
        const result = await pool.query('SELECT image_url FROM tasks WHERE user_id = $1 and task_id = $2', [
            data.user_id,
            data.task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const removeImageUrl = async (data: RemoveImageType) => {
    try {
        const result = await pool.query('UPDATE tasks SET image_url = NULL WHERE user_id = $1 and task_id = $2 RETURNING *', [
            data.user_id,
            data.task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}


export = {
 
    getImageUrl,
    updateImageUrl,
    removeImageUrl
}
