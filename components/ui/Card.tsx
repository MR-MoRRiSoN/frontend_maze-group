import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = true,
  padding = "md",
  style,
}) => {
  const paddingClasses = {
    sm: "p-6",
    md: "p-8",
    lg: "p-12",
  };

  return (
    <div
      style={style}
      className={cn(
        "bg-white rounded-3xl shadow-xl transition-all duration-500",
        hoverable && "hover:shadow-2xl hover:scale-101",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};
