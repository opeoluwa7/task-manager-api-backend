import { Express } from "../types/express/types"


const unknownRoute = ({req, res, next}: Express) => {
    res.status(404).json({
        error: "Route not found"
    })
}

export default unknownRoute
