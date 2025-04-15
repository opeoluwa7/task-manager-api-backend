"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!!"
    });
}
exports.default = errorHandler;
