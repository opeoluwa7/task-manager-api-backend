
import taskFn from "../../utils/helper_functions/task-functions";
import { taskIdSchema } from "../../schemas/taskSchema";
import GetOneTaskType from "../../types/taskTypes/GetOneTaskType";
import DeleteTaskType from "../../types/taskTypes/DeleteTaskType";
import { RequestHandler } from "express";

const deleteUserTaskController: RequestHandler = async (req, res, next) => {
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

        let checkTask: GetOneTaskType = {
            user_id: user_id,
            task_id: task_id
        }

        let task = await taskFn.getTaskById(checkTask);

        if (!task) {
            return res.status(404).json({ 
                error: "Task not found in the database!" 
            })
        }

        let deletedTask: DeleteTaskType = {
            task_id: task_id
        }

        const result = await taskFn.deleteTask(deletedTask);

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
