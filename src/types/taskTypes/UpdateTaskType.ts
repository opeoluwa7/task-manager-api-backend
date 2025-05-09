type UpdateTaskType = {
    title?: string,
    description?: string, 
    status?: string,
    priority?: string,
    deadline?: Date,
    user_id: number,
    task_id: number
}

export default UpdateTaskType
