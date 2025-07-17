import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "font-bold rounded-xl transition-all duration-300 transform hover:scale-105";

  const variants = {
    primary: "bg-[#032685] text-white hover:bg-[#021d5a]",
    secondary: "bg-white text-[#032685] hover:bg-gray-100",
    outline: "border-2 border-[#032685] text-[#032685] hover:bg-[#e6f2ff]",
    ghost: "text-[#032685] hover:bg-[#e6f2ff]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-12 py-5 text-xl",
  };

  return (
    <button
      style={{ cursor: "pointer" }}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
