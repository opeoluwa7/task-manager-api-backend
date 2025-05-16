import { Express } from "../../types/express/types";
import taskFn from "../../utils/helper_functions/task-functions";
import GetAllTasksType from "../../types/taskTypes/GetAllTasksType";
import { variables } from "../../global/variables";


const getAllTasksController = async (express: Express) => {
    try {


        const user_id: number = express.req.user?.user_id;


        let task: GetAllTasksType = {
            user_id: user_id,
            limit: variables.limit,
            offset: variables.offset
        }
       
 
        const results = await taskFn.getAllTasks(task)

        if (!results) return express.res.status(500).json({
            error: "Internal Server Error"
        })

        if (results.length === 0) {
            return express.res.status(404).json({
                error: "No tasks found!"
        });
        }

        express.res.status(200).json({
            success: true,
            message: "All tasks",
            body: results
        });
    } catch (error) {
        express.next(error)
    }
}

export default getAllTasksController
 
