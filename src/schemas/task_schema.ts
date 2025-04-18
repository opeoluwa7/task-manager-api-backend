import { z } from "zod";

export const createTaskSchema = z.object({
        title: z.string().trim().optional(),
        description: z.string().trim().optional(),
        status: z.string().toLowerCase().trim().optional(),
        priority: z.string().toLowerCase().trim().optional(),
        deadline: z.string().date().trim().optional()
})

export const updateTaskSchema = z.object({
        title: z.string().trim().optional(),
        description: z.string().trim().optional(),
        status: z.string().toLowerCase().trim().optional(),
        priority: z.string().toLowerCase().trim().optional(),
        deadline: z.string().date().trim().optional()
})
