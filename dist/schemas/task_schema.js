"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim(),
    description: zod_1.z.string().trim(),
    status: zod_1.z.string().toLowerCase().trim(),
    priority: zod_1.z.string().toLowerCase().trim(),
    deadline: zod_1.z.string().date().trim()
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().trim(),
    description: zod_1.z.string().trim(),
    status: zod_1.z.string().toLowerCase().trim(),
    priority: zod_1.z.string().toLowerCase().trim(),
    deadline: zod_1.z.string().date().trim()
});
