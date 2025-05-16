import { Request, Response, NextFunction } from "express"


export type Express = {
                req: Request,
                res: Response,
                next: NextFunction
}
