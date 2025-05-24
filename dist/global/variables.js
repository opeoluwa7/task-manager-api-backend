"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCookie = exports.accessCookie = exports.variables = void 0;
const ms_1 = __importDefault(require("ms"));
var limit = 20;
var offset = 0;
exports.variables = {
    limit,
    offset
};
exports.accessCookie = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: (0, ms_1.default)("15m")
};
exports.refreshCookie = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    path: "api/refresh-token",
    maxAge: (0, ms_1.default)("3d")
};
