import { motion } from "framer-motion";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles = "rounded-lg font-bold flex items-center justify-center transition-all";

  const variantStyles = {
    primary: "bg-primary text-background hover:opacity-80",
    secondary: "bg-secondary text-white hover:opacity-80",
    accent: "bg-accent text-white hover:opacity-80",
    outline: "border border-text text-text hover:bg-background",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
