import { RequestHandler } from "express"

const unknownRoute: RequestHandler = (req, res, next) => {
    res.status(404).json({
        error: "Route not found"
    })
}

export default unknownRoute
