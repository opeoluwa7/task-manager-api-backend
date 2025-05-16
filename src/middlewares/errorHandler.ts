import { Express } from "../types/express/types";


function errorHandler(err: Error, express: Express)  {


    express.res.status(500).json({
        error: err.message
    })

    
}

export default errorHandler
