import pool from "../db_pool/pool";

const uploadImageUrl = async(image_url: string) => {
    try {
        const results = await pool.query('INSERT INTO tasks (image_url) VALUES($1) RETURNING image_url', [
            image_url
        ]);

        return results.rows[0];
    } catch (error) {
        return null
    }
}


export = {
    uploadImageUrl
}
