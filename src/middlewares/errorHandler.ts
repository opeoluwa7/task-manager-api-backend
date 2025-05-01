import { NextFunction, Request, Response } from "express";


function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {


    res.status(500).json({
        success: false,
        error: err.message
    })

    
}

export default errorHandler
