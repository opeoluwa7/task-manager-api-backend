import { NextFunction, Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!!"
    })

    
}

export default errorHandler
