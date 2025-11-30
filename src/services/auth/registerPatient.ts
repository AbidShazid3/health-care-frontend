/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";

const registerPatientZodSchema = z.object({
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

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const validationData = {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };
        const validatedFields = registerPatientZodSchema.safeParse(validationData);
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
        };

        const registerData = {
            password: formData.get("password"),
            patient: {
                name: formData.get("name"),
                email: formData.get("email"),
                address: formData.get("address")
            },
        };

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));
        const res = await fetch("http://localhost:5000/api/v1/user/create-patient", {
            method: "POST",
            body: newFormData,
        }).then(res => res.json());
        console.log(res, "res in server action");
        return res;
    } catch (error) {
        console.log(error);
        return { error: "Registration failed" }
    }
}