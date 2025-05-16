import { z } from "zod";

const schema = {
        name: z.string().trim(),
        email: z.string().email({
                message: "Enter a valid email address"
        }).toLowerCase().trim(),
        password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                message: "Password must include at least one letter, one number, and one special character"
        }).trim()
}


export const registerSchema = z.object({
        name: schema.name,
        email: schema.email,
        password: schema.password
}).strict()

export const updateUserSchema = z.object({
        name: schema.name.optional(),
        email: schema.email.optional(),
        password: schema.password.optional()
}).strict()

export const loginSchema = z.object({
        email: schema.email,
        password: schema.password
}).strict()

export const forgotPasswordSchema = z.object({
        email: schema.email
}).strict()

export const resetPasswordSchema = z.object({
        password: schema.password
}).strict()


