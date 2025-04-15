"use strict";
const rateLimit = require("express-rate-limit");
const createRateLimiter = (minutes, maxRequests, message) => {
    return rateLimit({
        windowMs: minutes * 60 * 1000, //this converts minutes to milliseconds
        max: maxRequests,
        message: message || "Too many requests, please try again later."
    });
};
module.exports = createRateLimiter;
