import { NextFunction, Request, Response } from "express"
import { Express } from "../types/express/types"


const unknownRoute = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        error: "Route not found"
    })
}

export default unknownRoute
