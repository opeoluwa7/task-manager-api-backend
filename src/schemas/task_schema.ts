import { z } from "zod";

export const createTaskSchema = z.object({
        title: z.string().trim(),
        description: z.string().trim(),
        status: z.string().toLowerCase().trim(),
        priority: z.string().toLowerCase().trim(),
        deadline: z.string().date().trim()
})

export const updateTaskSchema = z.object({
        title: z.string().trim(),
        description: z.string().trim(),
        status: z.string().toLowerCase().trim(),
        priority: z.string().toLowerCase().trim(),
        deadline: z.string().date().trim()
})
