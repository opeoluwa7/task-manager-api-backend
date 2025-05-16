import { Express } from "../../types/express/types";
import cloudinary from "../../config/cloudinaryConfig";
import taskFn from "../../utils/helper_functions/task-functions";
import { taskIdSchema } from "../../schemas/taskSchema";
import GetOneTaskType from "../../types/taskTypes/GetOneTaskType";
import UpdateImageType from "../../types/taskTypes/UpdateImageType";

const uploadTaskImageController = async(express: Express) => {
    try { 

        const file = express.req.file;

        if (!file) return express.res.status(400).json({
            error: "Please provide an image path and make sure your key is image"
        })

        cloudinary.uploader.upload(file.path, async (err: Error, result: any) => {
            if (err) {
                return express.res.status(400).json({
                    message: "Error uploading image",
                })
            }

            const imgUrl: string = result.url;

            const user_id: number = express.req.user?.user_id;

           
            const value = taskIdSchema.safeParse(express.req.params)

            if (!value.success) return express.res.status(400).json({
                error: value.error.format()
            })

            const {id} = value.data

            const task_id = Number(id);

            if (!task_id || isNaN(task_id)) return express.res.status(400).json({
                error: "Task id is required and must be a number"
            })

            const task: GetOneTaskType = {
                user_id: user_id,
                task_id: task_id
            }

            const existingTask = await taskFn.getTaskById(task);

            if (!existingTask) return express.res.status(404).json({
                error: "Task not found"
            })

            const image: UpdateImageType = {
                image_url: imgUrl,
                user_id: user_id,
                task_id: task_id
            }

            const results = await taskFn.updateTaskImage(image)

            express.res.status(201).json({
                success: true,
                message: "File uploaded successfully!",
                body: results
            })
        })
    } catch (err) {
        express.next(err)
    }
}

export default uploadTaskImageController

