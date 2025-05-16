"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTaskSchema = exports.updateTaskSchema = exports.taskIdSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const allowedStatus = ["pending", "in_progress", "completed"];
const allowedPriority = ["low", "medium", "high"];
const statusError = "status must either be " + "pending, " + "in_progress, or " + "completed";
const priorityError = "priority must either be " + "low, " + "medium, or " + "high";
const schema = {
    title: zod_1.z.string().trim(),
    description: zod_1.z.string().trim().optional(),
    status: zod_1.z.string().refine((val) => allowedStatus.includes(val), { message: statusError }),
    priority: zod_1.z.string().refine((val) => allowedPriority.includes(val), { message: priorityError }),
    deadline: zod_1.z.string().date("Must be a valid datestring (YYYY-MM-DD)")
};
exports.createTaskSchema = zod_1.z.object({
    title: schema.title,
    description: schema.description.optional(),
    status: schema.status.optional(),
    priority: schema.priority.optional(),
    deadline: schema.deadline.optional()
}).strict();
exports.taskIdSchema = zod_1.z.object({
    id: zod_1.z.string()
}).strict();
exports.updateTaskSchema = zod_1.z.object({
    title: schema.title.optional(),
    description: schema.description.optional(),
    status: schema.status.optional(),
    priority: schema.priority.optional(),
    deadline: schema.deadline.optional()
}).strict();
exports.queryTaskSchema = zod_1.z.object({
    status: schema.status.optional(),
    priority: schema.priority.optional()
}).strict();
