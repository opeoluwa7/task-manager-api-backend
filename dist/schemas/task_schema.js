"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().toLowerCase().trim().optional(),
    priority: zod_1.z.string().toLowerCase().trim().optional(),
    deadline: zod_1.z.coerce.date().optional()
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().toLowerCase().trim().optional(),
    priority: zod_1.z.string().toLowerCase().trim().optional(),
    deadline: zod_1.z.coerce.date().optional()
});
