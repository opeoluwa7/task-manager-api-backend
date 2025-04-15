"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({});
exports.authSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .trim()
        .lowercase()
        .required()
        .messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required"
    }),
    password: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/)
        .required()
        .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must include at least one letter, one number, and one special character.",
        "any.required": "Password is required"
    })
}).unknown(true);
