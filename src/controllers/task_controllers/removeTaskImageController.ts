import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions"; 
import { taskIdSchema } from "../../schemas/taskSchema";




const removeTaskImageController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

      
        const value = taskIdSchema.safeParse(req.params)

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const {id} = value.data

        const task_id = Number(id);

        if (!task_id) return res.status(404).json({
            error: "Task id not found"
        })

        if (isNaN(task_id)) return res.status(400).json({
            error: "Task id must be a number"

        })

        const task = await taskFn.removeTaskImage(user_id, task_id)

          
        res.status(200).json({
            success: true,
            message: "Image removed successfully!",
            body: task
        })
    } catch (error) {
        next(error)
    }
}

export default removeTaskImageController
