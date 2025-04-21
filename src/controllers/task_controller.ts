import { Request, Response, NextFunction } from 'express';
import taskQueries from '../config/db_queries/task_queries';
import { createTaskSchema, updateTaskSchema } from '../schemas/task_schema';

const createNewTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = createTaskSchema.safeParse(req.body)

        if (!value.success) return res.status(400).json({
            success: false,
            error: value.error.format()
        })

        const task = value.data;

        const user_id: Number = req.user?.user_id;

        const results = await taskQueries.createTask(
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
        }
        )
    } catch (error) {
        next(error)
    }
}

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: Number = req.user?.user_id;

        const filters = req.query;
        let limit = 20;
        let offset = 0;

        const results = await taskQueries.getTasks(user_id, filters, limit, offset)

        if (results?.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No tasks found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks: results
        });
    } catch (error) {
        next(error)
    }
}

const getEachTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: Number = req.user?.user_id;

        const task_id: Number = Number(req.params.id);

        const results = await taskQueries.getTaskById(user_id, task_id);

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

const updateUserTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = updateTaskSchema.safeParse(req.body);

        if (!value.success) {
            return res.status(400).json({
                success: false,
                error: value.error.format()
            })
        }

        const updatedTask = value.data

        const user_id = req.user?.user_id;
        
        const task_id = Number(req.params.id);

        const results = await taskQueries.updateTask(
            updatedTask.title!,
            updatedTask.description!,
            updatedTask.status!,
            updatedTask.priority!,
            updatedTask.deadline!,
            user_id,
            task_id
        );

        const afterUpdateTask = await taskQueries.getTaskById(user_id, task_id);

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

const deleteUserTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id: number = req.user?.user_id;

        const task_id = Number(req.params.id);


        let task = await taskQueries.getTaskById(user_id, task_id);

        if (!task) {
            return res.status(404).json({ 
                success: false,
                error: "Task not found in the database!" 
            })
        }

        const result = await taskQueries.deleteTask(task.task_id);

        if(!result) {
            return res.status(500).json({
                success: false,
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

export = {
    createNewTask,
    getAllTasks,
    getEachTask,
    updateUserTask,
    deleteUserTask
}
