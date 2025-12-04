/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import Link from "next/link";
import { useActionState, useState } from "react";


const LoginForm = ({redirect}: {redirect?: string}) => {
  const [state, formAction, IsPending] = useActionState(loginUser, null);
  console.log(state);

  const [formValues, setFormValues] = useState({ email: "", password: "" })
  
  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
  })}
  
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

  return (
    <form action={formAction}>
      <FieldGroup>
        {redirect && <input type="hidden" name="redirect" value={redirect}></input>}
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formValues.email}
              onChange={handleChange}
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
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={IsPending} className="cursor-pointer">
              {IsPending ? "Login..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <Link
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;