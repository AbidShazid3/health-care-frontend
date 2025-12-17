/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const loginValidationZodSchema = z.object({
    email: z.
        email({ error: "Invalid email address" }),
    password: z
        .string()
        .min(5, "Password is required and must be at least 5 characters")
        .max(20, "Password must be exactly 20 characters")
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
})

export const registerPatientZodSchema = z.object({
    name: z.string().min(3, "Name is too short"),
    email: z.email("Invalid email address"),
    address: z.string().optional(),
    password: z
        .string()
        .min(5, "Password is required and must be at least 5 characters")
        .max(20, "Password must be exactly 20 characters")
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    confirmPassword: z
        .string()
        .min(5, "Confirm Password is required and must be at least 5 characters long")
        .max(20, "Confirm Password must be exactly 20 characters")
        .regex(/^(?=.*[A-Z])/, {
            message: "Confirm Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Confirm Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Confirm Password must contain at least 1 number.",
        }),
}).refine((data: any) => data.password === data.confirmPassword, { error: "Password not matched", path: ["confirmPassword"] })