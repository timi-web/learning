import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variantClasses =
      variant === "secondary"
        ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
        : "bg-indigo-500 text-white hover:bg-indigo-400";

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
