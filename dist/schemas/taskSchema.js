"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTaskSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const allowedStatus = ["pending", "in_progress", "completed"];
const allowedPriority = ["low", "medium", "high"];
const statusError = "Priority must either be " + "pending, " + "in_progress, or " + "completed";
const priorityError = "Priority must either be " + "pending, " + "medium or , " + "high";
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().refine((val) => allowedStatus.includes(val), { message: statusError }).optional(),
    priority: zod_1.z.string().refine((val) => allowedPriority.includes(val), { message: priorityError }).optional(),
    deadline: zod_1.z.coerce.date().optional()
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().refine((val) => allowedStatus.includes(val), { message: statusError }).optional(),
    priority: zod_1.z.string().refine((val) => allowedPriority.includes(val), { message: priorityError }).optional(),
    deadline: zod_1.z.coerce.date().optional()
});
exports.queryTaskSchema = zod_1.z.object({
    status: zod_1.z.string().refine((val) => allowedStatus.includes(val), { message: statusError }).optional(),
    priority: zod_1.z.string().refine((val) => allowedPriority.includes(val), { message: priorityError }).optional()
});
