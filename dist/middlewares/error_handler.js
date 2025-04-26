"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err);
    const statusCode = err.status || err.response?.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!!"
    });
}
exports.default = errorHandler;
