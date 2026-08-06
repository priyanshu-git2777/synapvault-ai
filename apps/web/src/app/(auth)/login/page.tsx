import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | SynapVault AI",
  description: "Sign in to your SynapVault AI workspace.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to your account"
      description="Continue to your secure document intelligence workspace."
      footerText="Do not have an account?"
      footerLinkText="Create one"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthShell>
  );
}