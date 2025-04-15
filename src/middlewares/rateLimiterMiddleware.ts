import rateLimit from "express-rate-limit";

const createRateLimiter = (minutes: number, maxRequests: number, message: string) => {
    return rateLimit({
        windowMs: minutes * 60 * 1000, //this converts minutes to milliseconds
        max: maxRequests,
        message: message || "Too many requests, please try again later."
    })
}

export default createRateLimiter;
