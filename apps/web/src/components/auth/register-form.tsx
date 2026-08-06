"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { registerUser } from "@/features/auth/auth.service";
import { saveAuthSession } from "@/features/auth/auth-storage";
import { ApiClientError } from "@/lib/api-client";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters.")
      .max(60, "Name cannot contain more than 60 characters."),

    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain one uppercase letter.")
      .regex(/[a-z]/, "Password must contain one lowercase letter.")
      .regex(/[0-9]/, "Password must contain one number."),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),

    acceptTerms: z.boolean().refine((value) => value, {
      message: "You must accept the Terms and Privacy Policy.",
    }),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    },
  );

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError("");

    try {
      const response = await registerUser({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      saveAuthSession(response);

      router.replace("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof ApiClientError) {
        if (error.fieldErrors) {
          Object.entries(error.fieldErrors).forEach(
            ([field, message]) => {
              if (
                field === "name" ||
                field === "email" ||
                field === "password"
              ) {
                setError(field, {
                  type: "server",
                  message:
                    typeof message === "string"
                      ? message
                      : "Please check this field.",
                });
              }
            },
          );
        }

        setServerError(
          error.message || "Unable to create your account.",
        );

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
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Full name
        </label>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "name-error" : undefined
            }
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            {...register("name")}
          />
        </div>

        {errors.name && (
          <p
            id="name-error"
            className="mt-2 text-sm text-rose-300"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Email address
        </label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p
            id="email-error"
            className="mt-2 text-sm text-rose-300"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a strong password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "password-error" : undefined
            }
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
          <p
            id="password-error"
            className="mt-2 text-sm text-rose-300"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Confirm password
        </label>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="confirm-password"
            type={
              showConfirmPassword ? "text" : "password"
            }
            autoComplete="new-password"
            placeholder="Enter the password again"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword
                ? "confirm-password-error"
                : undefined
            }
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            {...register("confirmPassword")}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (current) => !current,
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
            aria-label={
              showConfirmPassword
                ? "Hide confirmed password"
                : "Show confirmed password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p
            id="confirm-password-error"
            className="mt-2 text-sm text-rose-300"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-300">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 accent-cyan-300"
            {...register("acceptTerms")}
          />

          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        {errors.acceptTerms && (
          <p className="mt-2 text-sm text-rose-300">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

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

        {isSubmitting
          ? "Creating account..."
          : "Create account"}
      </button>
    </form>
  );
}