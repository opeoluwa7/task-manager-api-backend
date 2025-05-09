import { NextFunction, Request, Response } from "express";
import { taskIdSchema, updateTaskSchema } from "../../schemas/taskSchema";
import taskFn from "../../utils/helper_functions/task-functions";
import UpdateTaskType from "../../types/taskTypes/UpdateTaskType";
import GetOneTaskType from "../../types/taskTypes/GetOneTaskType";


const updateUserTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = updateTaskSchema.safeParse(req.body);

        if (!value.success) {
            return res.status(400).json({
                error: value.error.format()
            })
        }

        const data = value.data

        const user_id: number = req.user?.user_id;

        const id_value = taskIdSchema.safeParse(req.params)

        if (!id_value.success) return res.status(400).json({
            error: id_value.error.format()
        })

        const {id} = id_value.data

        const task_id = Number(id);

        if (!task_id || isNaN(task_id)) return res.status(400).json({
            error: "Task id is required and must be a number"
        })

        const task_deadline = new Date(data.deadline!);

        const task: GetOneTaskType = {
            user_id: user_id,
            task_id: task_id
        }

        const checkTask = await taskFn.getTaskById(task);

        if (!checkTask) return res.status(404).json({
            error: "Task not found in the database."
        })

        let updatedTask: UpdateTaskType = {
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            deadline: task_deadline,
            user_id: user_id,
            task_id: task_id
        }

        const results = await taskFn.updateTask(updatedTask);

        if (!results) {
            return res.status(500).json({
                error: "Error updating task. Something went wrong, try again"
            })
        }

        res.status(200).json({
            success: true,
            message: "Task updated succesfully!",
            body: results
        });
    } catch (error) {
        next(error)
    }   
}

export default updateUserTaskController
