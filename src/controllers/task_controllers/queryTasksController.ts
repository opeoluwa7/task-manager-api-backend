import { Express } from "../../types/express/types";
import { queryTaskSchema } from "../../schemas/taskSchema";
import taskFn from "../../utils/helper_functions/task-functions";
import QueryTasksType from "../../types/taskTypes/QueryTasksType";
import { FiltersType } from "../../types/utils/FiltersType";
import { variables } from "../../global/variables";



const queryTasksController = async ({req, res, next}: Express) => {
    try {

        const query = req.query;

        const queryArray = Object.entries(query)

        if (queryArray.length === 0) return res.status(404).json({
            error: "Query cannot be empty. At least one is required"
        })

        const value = queryTaskSchema.safeParse(query);

        if (!value.success) return res.status(400).json({
            error: value.error.format()

        })

        const {status, priority} = value.data

        const filters: FiltersType = {
            status,
            priority
        }

        const user_id = req.user?.user_id;

        const task: QueryTasksType = {
            user_id: user_id,
            filters: filters,
            limit: variables.limit,
            offset: variables.offset
        }

        const result = await taskFn.queryAllTasks(task)

        if (result.length === 0) return res.status(404).json({
            error: 'No tasks found'
        })

        res.status(200).json({
            success: true,
            message: "All queried tasks",
            body: result
        })
    } catch (error) {
        next(error)
    }
}

export default queryTasksController
