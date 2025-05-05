import { NextFunction, Request, Response } from "express";
import taskFn from "../../utils/helper_functions/task-functions";


const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const user_id: number = req.user?.user_id;

       
 
        const results = await taskFn.getAllTasks(user_id)

        if (!results) return res.status(500).json({
            error: "Internal Server Error"
        })

        if (results.length === 0) {
            return res.status(404).json({
                error: "No tasks found!"
        });
        }

        res.status(200).json({
            success: true,
            message: "All tasks",
            body: results
        });
    } catch (error) {
    next(error)
    }
}

export default getAllTasksController
 
