import uploadQueries from "../config/db_queries/uploadQueries";
import cloudinary from "../config/cloudinaryConfig";
import { Request, Response, NextFunction } from "express";

const uploadImage = async(req: Request, res: Response, next: NextFunction) => {
    try {
        cloudinary.uploader.upload(req.file?.path, async (err: Error, result: any) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                    error: err.message
                })
            }

            console.log(result)

            const imgUrl: string = result.url;

            const imageUpload = await uploadQueries.uploadImageUrl(imgUrl);

            if (!imageUpload) return res.status(400).json({
                success: false,
                error: "Something went wrong"
            })

            const user_id = req.user?.user_id;

            const task_id = Number(req.params.id)

            const results = await uploadQueries.updateImageUrl(imgUrl, user_id, task_id)

            res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                image: results
            })
        })
    } catch (err) {
        next(err)
    }
}

const removeImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: Number = req.user?.user_id;
        
        const task_id = Number(req.params.id);

        const imageUrl = await uploadQueries.getImageUrl(user_id, task_id);

        const results = await uploadQueries.removeImageUrl(imageUrl, user_id, task_id)

        if (!results) return res.status(404).json({
            success: false,
            error: "Image not found"
        })

        res.status(200).json({
            success: true,
            message: "Image removed successfully!"
        })
    } catch (error) {
        next(error)
    }
}


export const ImageController = {
    uploadImage,
    removeImage
}
