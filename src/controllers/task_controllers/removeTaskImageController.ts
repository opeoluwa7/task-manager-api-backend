import { Express } from "../../types/express/types";
import taskFn from "../../utils/helper_functions/task-functions"; 
import { taskIdSchema } from "../../schemas/taskSchema";
import GetOneTaskType from "../../types/taskTypes/GetOneTaskType";
import RemoveImageType from "../../types/taskTypes/RemoveImageType";




const removeTaskImageController = async (express: Express) => {
    try {
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

        const checkTask: GetOneTaskType = {
            user_id: user_id,
            task_id: task_id
        }

        const existingTask = await taskFn.getTaskById(checkTask);

        if (!existingTask) return express.res.status(404).json({
            error: "Task not found"
        })

        if (existingTask.image_url === null) return express.res.status(404).json({
            error: "Image not found"
        })

        const image: RemoveImageType = {
            user_id: user_id,
            task_id: task_id
        }

        const result = await taskFn.removeTaskImage(image);
        
        express.res.status(200).json({
            success: true,
            message: "Image removed successfully!",
            body: result
        })
    } catch (error) {
        express.next(error)
    }
}

export default removeTaskImageController
