import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-700">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-pretty text-base leading-8 text-slate-600">
        {description}
      </p>
    </div>
  );
}
