import { z } from "zod";

export const emailSchema = z.string().trim().email().max(254);
export const signInSchema = z.object({ email: emailSchema, password: z.string().min(1).max(1024) }).strict();
export const signUpSchema = z.object({ firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80), email: emailSchema, password: z.string().min(12).max(1024), confirmPassword: z.string().max(1024) }).strict().refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match." });
export const profileSchema = z.object({ firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80) }).strict();
export const accountDeletionSchema = z.object({ confirmation: z.literal("DELETE") }).strict();
