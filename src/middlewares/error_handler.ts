import { NextFunction, Request, Response } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
 
    console.error(err);

    const statusCode = err.status || err.response?.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!!"
    })

    
}

export default errorHandler
