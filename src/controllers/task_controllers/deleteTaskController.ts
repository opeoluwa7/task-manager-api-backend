import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions";
import { taskIdSchema } from "../../schemas/taskSchema";

const deleteUserTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const value = taskIdSchema.safeParse(req.params)

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const {id} = value.data

        const task_id = Number(id);

        if (!task_id || isNaN(task_id)) return res.status(400).json({
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
