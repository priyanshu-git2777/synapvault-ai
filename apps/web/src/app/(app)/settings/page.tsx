"use client";

import {  useState } from "react";
import {
  Bell,
  LockKeyhole,
  Save,
  UserRound,
} from "lucide-react";

import { getStoredUser } from "@/features/auth/auth-storage";
import type { AuthUser } from "@/features/auth/auth.types";

export default function SettingsPage() {
  const [user] = useState<AuthUser | null>(() => getStoredUser());

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <p className="text-sm font-medium text-cyan-200">
          Account preferences
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Profile information
              </h2>

              <p className="text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="settings-name"
                className="mb-2 block text-sm text-slate-300"
              >
                Full name
              </label>

              <input
                id="settings-name"
                type="text"
                defaultValue={user?.name ?? ""}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-cyan-300/40"
              />
            </div>

            <div>
              <label
                htmlFor="settings-email"
                className="mb-2 block text-sm text-slate-300"
              >
                Email
              </label>

              <input
                id="settings-email"
                type="email"
                defaultValue={user?.email ?? ""}
                disabled
                className="h-11 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-slate-500"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-violet-200" />

            <div>
              <h2 className="font-semibold text-white">
                Security
              </h2>

              <p className="text-sm text-slate-500">
                Password and account security options.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            Change password
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-amber-200" />

            <div>
              <h2 className="font-semibold text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Control document-processing notifications.
              </p>
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-cyan-300"
            />

            Notify me when a document finishes processing
          </label>
        </section>
      </div>
    </div>
  );
}