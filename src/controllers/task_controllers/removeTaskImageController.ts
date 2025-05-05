import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions"; 




const removeTaskImageController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const task_id = Number(req.params.id);



        const task = await taskFn.removeTaskImage(user_id, task_id)

          
        res.status(200).json({
            success: true,
            message: "Image removed successfully!",
            task: task
        })
    } catch (error) {
        next(error)
    }
}

export default removeTaskImageController
