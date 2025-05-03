import { z } from "zod";

const allowedStatus = ["pending", "in_progress", "completed"];
const allowedPriority = ["low", "medium", "high"];
const statusError = "status must either be " + "pending, " + "in_progress, or " + "completed" 
const priorityError = "priority must either be " + "pending, " + "medium or , " + "high" 

export const createTaskSchema = z.object({
        title: z.string().trim(),

        description: z.string().trim().optional(),

        status:  z.string().refine(
                (val) => allowedStatus.includes(val),
                { message: statusError }
        ).optional(),

        priority: z.string().refine(
                (val) => allowedPriority.includes(val),
                { message: priorityError }
        ).optional(),

        deadline: z.coerce.date().optional()
})

export const updateTaskSchema = z.object({
        title: z.string().trim().optional(),

        description: z.string().trim().optional(),

        status:  z.string().refine(
                (val) => allowedStatus.includes(val),
                { message: statusError }
        ).optional(),

        priority: z.string().refine(
                (val) => allowedPriority.includes(val),
                { message: priorityError }
        ).optional(),

        deadline: z.coerce.date().optional()
})

export const queryTaskSchema = z.object({
        status: z.string().refine(
                (val) =>  allowedStatus.includes(val),
                { message: statusError }
        ).optional(),

        priority: z.string().refine(
                (val) => allowedPriority.includes(val),
                { message: priorityError }
        ).optional()
})
