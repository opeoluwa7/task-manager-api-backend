import ms from "ms";


var limit: number = 20;
var offset: number = 0;



export const variables = {
        limit,
        offset
}


export const accessCookie = {
        httpOnly: true,
        secure: true,
        sameSIte: 'none',
        maxAge: ms("15m")
}

export const refreshCookie = {
        httpOnly: true,
        secure: true,
        sameSIte: 'none',
        path: "api/refresh-token",
        maxAge: ms("3d")
} 
