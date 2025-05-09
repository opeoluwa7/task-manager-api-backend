import { FiltersType } from "../utils/FiltersType"

type QueryTasksType = {
    user_id: number,
    filters: FiltersType,
    limit: number,
    offset: number
}

export default QueryTasksType
