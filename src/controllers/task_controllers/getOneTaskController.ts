
import taskFn from "../../utils/helper_functions/task-functions";
import { taskIdSchema } from "../../schemas/taskSchema";
import { RequestHandler } from "express";

const getOneTaskController: RequestHandler = async (req, res, next) => {
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

        const task = {
            user_id: user_id,
            task_id: task_id
        }

        const results = await taskFn.getTaskById(task)

        if (!results) return res.status(404).json({
            error: "Task not found"
        })

        res.status(200).json({
            success: true,
            message: "Task",
            body: results
        })
    } catch (error) {
        next(error)
    }
}

export default getOneTaskController

