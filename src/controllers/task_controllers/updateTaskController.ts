import { NextFunction, Request, Response } from "express";
import { updateTaskSchema } from "../../schemas/taskSchema";
import taskFn from "../../utils/helper_functions/task-functions";


const updateUserTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = updateTaskSchema.safeParse(req.body);

        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            })
        }

        const updatedTask = value.data

        const user_id: number = req.user?.user_id;

        const task_id: number = Number(req.params.id);

        const results = await taskFn.updateTask(
            updatedTask.title!,
            updatedTask.description!,
            updatedTask.status!,
            updatedTask.priority!,
            updatedTask.deadline!,
            user_id,
            task_id
        );

        const afterUpdateTask = await taskFn.getTaskById(user_id, task_id);

        if (!afterUpdateTask) return res.status(404).json({
            success: false,
            error: "Task not found in the database."
        })


        if (!results) {
            return res.status(500).json({
                succcess: false,
                error: "Error updating task. Something went wrong, try again"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task updated succesfully!",
            updatedTask: results
        });
    } catch (error) {
        next(error)
    }   
}

export default updateUserTaskController
