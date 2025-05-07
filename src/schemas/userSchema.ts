import { z } from "zod";

export const registerSchema = z.object({
        name: z.string().trim(),
        email: z.string().email({
                message: "Enter a valid email address"
        }).toLowerCase().trim(),
        password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                message: "Password must include at least one letter, one number, and one special character"
        }).trim()
}).strict()

export const updateUserSchema = z.object({
        name: z.string().trim().optional(),
        email: z.string().toLowerCase().email({
                        message: "Enter a valid email address"
                }).trim().optional(),
        password: z.string().min(8, {
                        message: "Password must be a minimum of 8 characters long"
                }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                        message: "Password must include at least one letter, one number, and one special character"
                }).trim().optional()
}).strict()

export const loginSchema = z.object({
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                message: "Password must include at least one letter, one number, and one special character"
        }).trim()
}).strict()

export const forgotPasswordSchema = z.object({
        email: z.string().email({
                message: "Enter a valid email"
        }).toLowerCase().trim()
}).strict()

export const resetPasswordSchema = z.object({
        password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, { 
                message: "Password must include at least one letter, one number, and one special character"
        }).trim() 
}).strict()


