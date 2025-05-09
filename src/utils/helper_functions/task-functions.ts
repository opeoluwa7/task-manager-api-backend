import taskQueries from "../../config/db_queries/taskQueries";

import uploadQueries from "../../config/db_queries/uploadQueries";
import createTaskType from "../../types/taskTypes/CreateTaskType";
import DeleteTaskType from "../../types/taskTypes/DeleteTaskType";
import GetAllTasksType from "../../types/taskTypes/GetAllTasksType";
import GetOneTaskType from "../../types/taskTypes/GetOneTaskType";
import QueryTasksType from "../../types/taskTypes/QueryTasksType";
import RemoveImageType from "../../types/taskTypes/RemoveImageType";
import UpdateImageType from "../../types/taskTypes/UpdateImageType";
import UpdateTaskType from "../../types/taskTypes/UpdateTaskType";
import { FiltersType } from "../../types/utils/FiltersType";


const createTask = async (data: createTaskType) => {
    const result = await taskQueries.createTask(data);

    return result
}

const getAllTasks = async (data: GetAllTasksType) => {
    const result = await taskQueries.getTasks(data);

    return result
}

const queryAllTasks = async (data: QueryTasksType) => {
    const result = await taskQueries.queryTasks(data)

    return result
}

const getTaskById = async (data: GetOneTaskType) => {
    const result = await taskQueries.getTaskById(data);

    return result
}

const updateTask = async (data: UpdateTaskType) => {
    const result = await taskQueries.updateTask(data)

    return result
}

const deleteTask = async (data: DeleteTaskType) => {
    const result = await taskQueries.deleteTask(data)

    return result
}



const updateTaskImage = async (data: UpdateImageType) => {
    const result = await uploadQueries.updateImageUrl(data)

    return result
}

const removeTaskImage = async (data: RemoveImageType) => {
    const result = await uploadQueries.removeImageUrl(data)

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
