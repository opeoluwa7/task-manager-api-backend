import pool from "../db_pool/pool";

const uploadImageUrl = async(image_url: string) => {
    try {
        const result = await pool.query('INSERT INTO tasks (image_url) VALUES($1) RETURNING image_url', [
            image_url
        ]);

        return result.rows[0];
    } catch (error) {
        throw error
    }
}

const checkImageIfExists = async (user_id: number, task_id: number) => {
    try {
        const result = await pool.query('SELECT image_url FROM tasks WHERE user_id = $1 and task_id = $2', [
            user_id, task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const updateImageUrl = async (image_url: string, user_id: number, task_id: number) => {
    try {
        const result = await pool.query('UPDATE tasks SET image_url = COALESCE($1, image_url) WHERE user_id = $2 and task_id = $3 RETURNING *', [
            image_url,
            user_id,
            task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const getImageUrl = async (user_id: number, task_id: number) => {
    try {
        const result = await pool.query('SELECT image_url FROM tasks WHERE user_id = $1 and task_id = $2', [
            user_id,
            task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}

const removeImageUrl = async (user_id: number, task_id: number) => {
    try {
        const result = await pool.query('UPDATE tasks SET image_url = NULL WHERE user_id = $1 and task_id = $2 RETURNING *', [
            user_id,
            task_id
        ])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}


export = {
    uploadImageUrl,
    checkImageIfExists,
    getImageUrl,
    updateImageUrl,
    removeImageUrl
}
