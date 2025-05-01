import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions";

const getOneTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const task_id: number = Number(req.params.id);

        const results = await taskFn.getTaskById(user_id, task_id)

        if (!results) return res.status(404).json({
            success: false,
            error: "Task not found"
        })

        res.status(200).json({
            success: true,
            message: "Task",
            Task: results
        })
    } catch (error) {
        next(error)
    }
}

export default getOneTaskController

