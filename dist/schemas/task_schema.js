"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
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
exports.queryTaskSchema = zod_1.z.object({
    status: zod_1.z.string().refine((val) => ["pending", "in_progress", "completed"].includes(val), { message: "Status must either be \"pending\", \"in_progress\", or \"completed\" " }).optional(),
    priority: zod_1.z.string().refine((val) => ["low", "medium", "high"].includes(val), { message: "Priority must either be \"low\", \"medium\", or \"high\" " }).optional()
});
