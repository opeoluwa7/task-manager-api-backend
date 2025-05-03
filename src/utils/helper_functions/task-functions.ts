import taskQueries from "../../config/db_queries/taskQueries";

import uploadQueries from "../../config/db_queries/uploadQueries";
import { FiltersType } from "../../types/utils/FiltersType";


const createTask = async (title:  string, description: string, status: string, priority: string, deadline: Date, user_id: number) => {
    const result = await taskQueries.createTask(title, description, status, priority, deadline, user_id);

    return result
}

const getAllTasks = async (user_id: number, limit = 20, offset = 0) => {
    const result = await taskQueries.getTasks(user_id, limit, offset);

    return result
}

const queryAllTasks = async (user_id: number, filters: FiltersType, limit = 20, offset = 0) => {
    const result = await taskQueries.queryTasks(user_id, filters, limit, offset)

    return result
}

const getTaskById = async (user_id: number, task_id: number) => {
    const result = await taskQueries.getTaskById(user_id, task_id);

    return result
}

const updateTask = async (title:  string, description: string, status: string, priority: string, deadline: Date, user_id: number, task_id: number) => {
    const result = await taskQueries.updateTask(title, description, status, priority, deadline, user_id, task_id)

    return result
}

const deleteTask = async (task_id: number) => {
    const result = await taskQueries.deleteTask(task_id)

    return result
}



const updateTaskImage = async (imgUrl: string, user_id: number, task_id: number) => {
    const result = await uploadQueries.updateImageUrl(imgUrl, user_id, task_id)

    return result
}

const removeTaskImage = async (user_id: number, task_id: number) => {
    const result = await uploadQueries.removeImageUrl(user_id, task_id)

    return result
}

const taskFn = {
    createTask,
    getAllTasks,
    queryAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
   
    updateTaskImage,
    removeTaskImage
}

export default taskFn
