import { NextFunction, Request, Response } from "express";
import { queryTaskSchema } from "../../schemas/taskSchema";
import taskFn from "../../utils/helper_functions/task-functions";



const queryTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.query;

        const queryArray = Object.entries(query)

        if (queryArray.length === 0) return res.status(400).json({
            error: "Query cannot be empty. At least one is required"
        })

        const value = queryTaskSchema.safeParse(query);

        if (!value.success) return res.status(400).json({
            error: value.error.format()

        })

        const {status, priority} = value.data

        const filters = {
            status,
            priority
        }

        const user_id = req.user?.user_id

        const result = await taskFn.queryAllTasks(user_id, filters)

        if (result.length === 0) return res.status(404).json({
            error: `No tasks found`
        })

        res.status(200).json({
            success: true,
            message: "All queried tasks",
            tasks: result
        })
    } catch (error) {
        next(error)
    }
}

export default queryTasksController
