"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const schema = {
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().email({
        message: "Enter a valid email address"
    }).toLowerCase().trim(),
    password: zod_1.z.string().min(8, {
        message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "Password must include at least one letter, one number, and one special character"
    }).trim()
};
exports.registerSchema = zod_1.z.object({
    name: schema.name,
    email: schema.email,
    password: schema.password
}).strict();
exports.updateUserSchema = zod_1.z.object({
    name: schema.name.optional(),
    email: schema.email.optional(),
    password: schema.password.optional()
}).strict();
exports.loginSchema = zod_1.z.object({
    email: schema.email,
    password: schema.password
}).strict();
exports.forgotPasswordSchema = zod_1.z.object({
    email: schema.email
}).strict();
exports.resetPasswordSchema = zod_1.z.object({
    password: schema.password
}).strict();
