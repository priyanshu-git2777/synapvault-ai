import {
  Building2,
  GraduationCap,
  Landmark,
  Microscope,
  Scale,
} from "lucide-react";

const audiences = [
  {
    label: "Research",
    icon: Microscope,
  },
  {
    label: "Education",
    icon: GraduationCap,
  },
  {
    label: "Business",
    icon: Building2,
  },
  {
    label: "Legal",
    icon: Scale,
  },
  {
    label: "Public sector",
    icon: Landmark,
  },
];

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trusted-workflows-heading"
      className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8"
    >
      <p
        id="trusted-workflows-heading"
        className="text-center text-xs font-black uppercase tracking-[0.24em] text-slate-500"
      >
        Designed for evidence-sensitive workflows
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {audiences.map((audience) => {
          const Icon = audience.icon;

          return (
            <div
              key={audience.label}
              className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-white/75 bg-white/45 px-4 text-sm font-bold text-slate-600 shadow-sm backdrop-blur-xl"
            >
              <Icon className="size-5 text-violet-600" aria-hidden="true" />
              {audience.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
