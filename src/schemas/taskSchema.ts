import { z } from "zod";

const allowedStatus = ["pending", "in_progress", "completed"];
const allowedPriority = ["low", "medium", "high"];
const statusError = "status must either be " + "pending, " + "in_progress, or " + "completed" 
const priorityError = "priority must either be " + "low, " + "medium, or " + "high" 

const schema = {
        title: z.string().trim(),

        description: z.string().trim().optional(),

        status:  z.string().refine(
                (val) => allowedStatus.includes(val),
                { message: statusError }
        ),

        priority: z.string().refine(
                (val) => allowedPriority.includes(val),
                { message: priorityError }
        ),

        deadline: z.string().date("Must be a valid datestring (YYYY-MM-DD)")
}


export const createTaskSchema = z.object({
        title: schema.title,

        description: schema.description.optional(),

        status:  schema.status.optional(),

        priority: schema.priority.optional(),

        deadline: schema.deadline.optional()
}).strict()

export const taskIdSchema = z.object({
        id: z.string()
}).strict()

export const updateTaskSchema = z.object({
        title: schema.title.optional(),

        description: schema.description.optional(),

        status: schema.status.optional(),

        priority: schema.priority.optional(),

        deadline: schema.deadline.optional()
}).strict()

export const queryTaskSchema = z.object({
        status: schema.status.optional(),

        priority: schema.priority.optional()
}).strict()

