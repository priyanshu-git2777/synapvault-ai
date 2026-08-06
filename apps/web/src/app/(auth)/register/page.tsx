import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account | SynapVault AI",
  description: "Create your SynapVault AI account.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start building a trusted and searchable knowledge workspace."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthShell>
  );
}