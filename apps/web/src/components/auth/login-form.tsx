"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginUser } from "@/features/auth/auth.service";
import { saveAuthSession } from "@/features/auth/auth-storage";
import { ApiClientError } from "@/lib/api-client";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must contain at least 8 characters."),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError("");

    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      saveAuthSession(response);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiClientError) {
        if (error.fieldErrors) {
          Object.entries(error.fieldErrors).forEach(
            ([field, message]) => {
              if (field === "email" || field === "password") {
                setError(field, {
                  type: "server",
                  message,
                });
              }
            },
          );
        }

        setServerError(error.message);
        return;
      }

      setServerError(
        "Unable to connect to the server. Make sure the backend is running.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Email address
        </label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-rose-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-200"
          >
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((current) => !current)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-rose-300">
            {errors.password.message}
          </p>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cyan-300"
          {...register("rememberMe")}
        />
        Keep me signed in
      </label>

      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
        >
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        )}

        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}