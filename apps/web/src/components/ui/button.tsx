import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl text-sm font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-violet-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-800",
        gradient:
          "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30",
        outline:
          "border border-slate-300/80 bg-white/50 text-slate-800 backdrop-blur-xl hover:-translate-y-0.5 hover:border-violet-300 hover:bg-white/80",
        ghost: "text-slate-700 hover:bg-white/60 hover:text-slate-950",
        glass:
          "border border-white/70 bg-white/55 text-slate-900 shadow-sm backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/80",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-2xl px-7 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, type = "button", ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
