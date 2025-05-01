"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    const error = err;
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
        success: false,
        message: error.response?.data?.error || "Something went wrong!!"
    });
}
exports.default = errorHandler;
