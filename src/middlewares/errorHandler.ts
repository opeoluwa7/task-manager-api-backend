import { NextFunction, Request, Response } from "express";


function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    
    type errorType = {
        response?: {
            status?: number,
            data?: {
                error?: string
            }
        }
    }
    const error = err as errorType 

    const statusCode =  error.response?.status || 500;

    res.status(statusCode).json({
        success: false,
        message: error.response?.data?.error || "Something went wrong!!"
    })

    
}

export default errorHandler
