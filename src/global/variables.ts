import { CookieOptions } from "express";
import ms from "ms";


var limit: number = 20;
var offset: number = 0;



export const variables = {
	limit,
	offset
}


export const accessCookie = {
	httpOnly: true,
	secure: false,
	sameSite: 'none',
	maxAge: ms("15m")

} as CookieOptions

export const refreshCookie = {
	httpOnly: true,
	secure: false,
	sameSite: 'none',
	path: "api/refresh-token",
	maxAge: ms("3d")

} as CookieOptions 
