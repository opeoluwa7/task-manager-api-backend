"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createRateLimiter = (minutes, maxRequests, message) => {
    return (0, express_rate_limit_1.default)({
        windowMs: minutes * 60 * 1000, //this converts minutes to milliseconds
        max: maxRequests,
        message: message
    });
};
exports.default = createRateLimiter;
