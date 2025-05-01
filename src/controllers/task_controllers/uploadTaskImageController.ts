import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudinaryConfig";
import taskFn from "../../utils/helper_functions/task-functions";

const uploadTaskImageController = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const image = req.file?.path;

        if (!image) return res.status(400).json({
            success: false,
            error: "Please provide an image"
        })

        cloudinary.uploader.upload(image, async (err: Error, result: any) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading image",
                    error: err.message
                })
            }

            const imgUrl: string = result.url;

            const imageUpload = await taskFn.uploadTaskImage(imgUrl);

            if (!imageUpload) return res.status(500).json({
                success: false,
                error: "Something went wrong"
            })

            const user_id: number = req.user?.user_id;

            const task_id = Number(req.params.id)

            const results = await taskFn.updateTaskImage(imgUrl, user_id, task_id)

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

export default uploadTaskImageController

