import { z } from "zod";

export const createTaskSchema = z.object({
        title: z.string().trim(),

        description: z.string().trim().optional(),

        status:  z.string().refine(
                (val) => ["pending", "in_progress", "completed"].includes(val),
                { message: "Status must either be \"pending\", \"in_progress\", or \"completed\" " }
        ).optional(),

        priority: z.string().refine(
                (val) => ["low", "medium", "high"].includes(val),
                { message: "Priority must either be \"low\", \"medium\", or \"high\" "}
        ).optional(),

        deadline: z.coerce.date().optional()
})

export const updateTaskSchema = z.object({
        title: z.string().trim().optional(),

        description: z.string().trim().optional(),

        status:  z.string().refine(
                (val) => ["pending", "in_progress", "completed"].includes(val),
                { message: "Status must either be \"pending\", \"in_progress\", or \"completed\" " }
        ).optional(),

        priority: z.string().refine(
                (val) => ["low", "medium", "high"].includes(val),
                { message: "Priority must either be \"low\", \"medium\", or \"high\" "}
        ).optional(),

        deadline: z.coerce.date().optional()
})

export const queryTaskSchema = z.object({
        status: z.string().refine(
                (val) => ["pending", "in_progress", "completed"].includes(val),
                { message: "Status must either be \"pending\", \"in_progress\", or \"completed\" " }
        ).optional(),

        priority: z.string().refine(
                (val) => ["low", "medium", "high"].includes(val),
                { message: "Priority must either be \"low\", \"medium\", or \"high\" "}
        ).optional()
})
