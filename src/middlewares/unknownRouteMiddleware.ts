import { Express } from "../types/express/types"


const unknownRoute = (express: Express) => {
    express.res.status(404).json({
        error: "Route not found"
    })
}

export default unknownRoute
