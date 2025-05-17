"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknownRoute = ({ req, res, next }) => {
    res.status(404).json({
        error: "Route not found"
    });
};
exports.default = unknownRoute;
