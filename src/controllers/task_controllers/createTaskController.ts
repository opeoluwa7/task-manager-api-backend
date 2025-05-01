import { NextFunction, Request, Response } from "express";
import { createTaskSchema } from "../../schemas/task_schema";
import taskFn from "../../utils/helper_functions/task-functions";



const createNewTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = createTaskSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })

        const task = value.data;

        const user_id: number = req.user?.user_id;

        const results = await taskFn.createTask(
            task.title!,
            task.description!,
            task.status!,
            task.priority!,
            task.deadline!,
            user_id
        );

        if (!results) return res.status(500).json({
            success: false,
            error: "Error creating task"
        })

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: results
        })
    } catch (error) {
        next(error)
    }
}

export default createNewTaskController
