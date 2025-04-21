import pool from "../db_pool/pool";

const uploadImageUrl = async(image_url: string) => {
    try {
        const results = await pool.query('INSERT INTO tasks (image_url) VALUES($1) RETURNING image_url', [
            image_url
        ]);

        return results.rows[0];
    } catch (error) {
        throw error
    }
}

const updateImageUrl = async (image_url: string, user_id: number, task_id: number) => {
    try {
        const results = await pool.query('UPDATE tasks SET image_url = COALESCE($1, image_url) WHERE user_id = $2 and task_id = $3', [
            image_url,
            user_id,
            task_id
        ])

        return results.rows[0]
    } catch (error) {
        throw error
    }
}


export = {
    uploadImageUrl,
    updateImageUrl
}
