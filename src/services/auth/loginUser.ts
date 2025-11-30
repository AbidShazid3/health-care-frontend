/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";

const loginValidationZodSchema = z.object({
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

export const loginUser = async (_currentState: any, formData: any) => {
    try {
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password")
        };
        const validatedFields = loginValidationZodSchema.safeParse(loginData);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }

        const res = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json());
        return res;
    } catch (error) {
        console.log(error);
        return { error: "Login failed" }
    }
}