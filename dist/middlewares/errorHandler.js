"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, express) {
    express.res.status(500).json({
        error: err.message
    });
}
exports.default = errorHandler;
