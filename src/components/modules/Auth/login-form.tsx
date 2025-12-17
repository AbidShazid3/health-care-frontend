/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
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
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";


const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, IsPending] = useActionState(loginUser, null);

  const [formValues, setFormValues] = useState({ email: "", password: "" })

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

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

            <InputFieldError field="email" state={state} />
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
            <InputFieldError field="password" state={state} />
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