import pool from "../db_pool/pool";

const uploadImageUrl = async(image_url: string, user_id: number) => {
    try {
        const results = await pool.query('INSERT INTO images (image_url, user_id) VALUES($1, $2) RETURNING *', [
            image_url,
            user_id
        ]);

        return results.rows[0];
    } catch (error) {
        return null
    }
}

const getImages = async(user_id: number) => {
    try {
        const results = await pool.query('SELECT image_url FROM images WHERE user_id = $1', [
            user_id
        ]);

        return results.rows
    } catch (error) {
        return null
    }
};

export = {
    uploadImageUrl,
    getImages
}
