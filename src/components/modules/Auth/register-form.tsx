/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
    const [state, formAction, IsPending] = useActionState(registerPatient, null);

    // Controlled form fields
    const [formValues, setFormValues] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const getFieldError = (fileName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fileName)
            if (error) {
                return error.message;
            } else {
                return null
            }
        } else {
            return null
        }
    };

    useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }
  }, [state]);

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name" name="name"
                            type="text"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="John Doe" />
                        {getFieldError("name") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("name")}
                            </FieldDescription>
                        )}
                    </Field>
                    {/* Address */}
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            value={formValues.address}
                            onChange={handleChange}
                            placeholder="123 Main St"
                        />

                        {getFieldError("address") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("address")}
                            </FieldDescription>
                        )}
                    </Field>
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder="m@example.com"
                        />

                        {getFieldError("email") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("email")}
                            </FieldDescription>
                        )}
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            value={formValues.password}
                            onChange={handleChange} />

                        {getFieldError("password") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("password")}
                            </FieldDescription>
                        )}
                    </Field>
                    {/* Confirm Password */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />

                        {getFieldError("confirmPassword") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("confirmPassword")}
                            </FieldDescription>
                        )}
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={IsPending} className="cursor-pointer">
                            {IsPending ? "Creating Account..." : "Create Account"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;