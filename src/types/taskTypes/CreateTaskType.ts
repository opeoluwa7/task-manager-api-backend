type createTaskType = {
    title: string,
    description?: string, 
    status?: string,
    priority?: string,
    deadline?: Date,
    user_id: number
}

export default createTaskType
