import * as React from "react";

import { cn } from "@lib/utils";
import { cva } from "class-variance-authority";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "sm" | "lg";
  label?: string;
}

const inputVariants = cva(
  "bg-transparent flex-1 text-secondary-foreground text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "py-2",
        lg: "py-3",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, startIcon, endIcon, id, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <div
          className={cn(
            "w-full flex rounded-md border bg-secondary/50 px-3 text-secondary-foreground text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          {startIcon && (
            <div className="flex items-center justify-center">{startIcon}</div>
          )}
          <input
            autoComplete="off"
            {...(id ? { id } : {})}
            type={type}
            className={cn(inputVariants({ size }), className)}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="flex items-center justify-center">{endIcon}</div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
