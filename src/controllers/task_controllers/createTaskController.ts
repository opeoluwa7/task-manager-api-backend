import { NextFunction, Request, Response } from "express";
import { createTaskSchema } from "../../schemas/taskSchema";
import taskFn from "../../utils/helper_functions/task-functions";
import createTaskType from "../../types/utils/CreateTaskType";



const createNewTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = createTaskSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
            error: value.error.format()
        })

        const data = value.data;

        const user_id: number = req.user?.user_id;

        const deadline = new Date(data.deadline!);

        const task: createTaskType = {
            title: data.title!,
            description: data.description!,
            status: data.status!,
            priority: data.priority!,
            deadline: deadline,
            user_id: user_id
        }

        const results = await taskFn.createTask(
            task
        );

        if (!results) return res.status(500).json({
            error: "Error creating task"
        })

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            body: results
        })
    } catch (error) {
        next(error)
    }
}

export default createNewTaskController
