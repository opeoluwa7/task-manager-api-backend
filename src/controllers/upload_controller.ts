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



export const ImageController = {
    uploadImage
}
