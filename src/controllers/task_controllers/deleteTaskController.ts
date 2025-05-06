import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions";

const deleteUserTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const id = req.params.id

        const task_id = Number(id);

        if (!id || isNaN(task_id)) return res.status(401).json({
            error: "Task id is required and must be a number"
        })


        let task = await taskFn.getTaskById(user_id, task_id);

        if (!task) {
            return res.status(404).json({ 
                error: "Task not found in the database!" 
            })
        }

        const result = await taskFn.deleteTask(task.task_id);

        if(!result) {
            return res.status(500).json({
                error: "Error deleting task. Something went wrong"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
    } catch (error) {
    next(error)
    }
}
 export default deleteUserTaskController
