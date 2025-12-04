/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";

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
        const redirectTo = formData.get("redirect") || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
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
        });

        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie["accessToken"]) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie["refreshToken"]) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No set-cookie header found")
        }

        if (!accessTokenObject) {
            throw new Error("No token found in cookies")
        }
        if (!refreshTokenObject) {
            throw new Error("No token found in cookies")
        }

        const cookieStore = await cookies();
        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
            path: accessTokenObject.path || "/",
            sameSite: accessTokenObject["SameSite"] || "none"
        });

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.path || "/",
            sameSite: refreshTokenObject["SameSite"] || "none"
        });

        const verifiedToken: string | JwtPayload = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string)
        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token")
        }


        // ... after token verification
        const userRole: UserRole = verifiedToken.role;
        const defaultDashboardPath = getDefaultDashboardRoute(userRole);
        let finalRedirectPath: string;

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            // 1. If a redirect path is requested, check if the role is allowed to access it.
            if (isValidRedirectForRole(requestedPath, userRole)) {
                finalRedirectPath = requestedPath;
            } else {
                // 2. If the user is NOT allowed, redirect them to their default dashboard.
                finalRedirectPath = defaultDashboardPath;
            }
        } else {
            // 3. If no redirect path was provided, redirect them to their default dashboard.
            finalRedirectPath = defaultDashboardPath;
        }

        // ALWAYS perform the redirect here
        redirect(finalRedirectPath);

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { error: "Login failed" }
    }
}