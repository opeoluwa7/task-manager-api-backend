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
            const user_id: number = req.user?.user_id;

            const imageUpload = await uploadQueries.uploadImageUrl(imgUrl, user_id);

            if (!imageUpload) return res.status(400).json({
                success: false,
                error: "Image upload failed. Are you logged in?"
            })

            res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                image: imageUpload
            })
        })
    } catch (err) {
        next(err)
    }
}


const getImages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.user_id; 

        const result = await uploadQueries.getImages(user_id);

        if (result?.length === 0) return res.status(404).json({
            success: false,
            error: "No images found",
        })

        res.status(200).json({
            success: true,
            images: result,
            mesage: "Successful!"
        })
    } catch (err) {
        next(err)
    }
}

export const ImageController = {
    uploadImage,
    getImages
}
