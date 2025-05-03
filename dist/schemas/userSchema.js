"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().toLowerCase().email({
        message: "Enter a valid email address"
    }).trim(),
    password: zod_1.z.string().min(8, {
        message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "Password must include at least one letter, one number, and one special character"
    }).trim()
}).strict();
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    email: zod_1.z.string().toLowerCase().email({
        message: "Enter a valid email address"
    }).trim().optional(),
    password: zod_1.z.string().min(8, {
        message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "Password must include at least one letter, one number, and one special character"
    }).trim().optional()
}).strict();
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase().trim(),
    password: zod_1.z.string().min(8, {
        message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "Password must include at least one letter, one number, and one special character"
    }).trim()
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().toLowerCase().trim()
}).strict();
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, {
        message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "Password must include at least one letter, one number, and one special character"
    }).trim()
}).strict();
