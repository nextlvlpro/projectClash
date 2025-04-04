import { motion } from "framer-motion";
import clsx from "clsx";

type InputProps = {
  type?: "text" | "email" | "password" | "number";
  name?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
};

export default function Input({
  type = "text",
  name = "",
  id = "",
  placeholder = "",
  value,
  onChange,
  variant = "default",
  size = "md",
  disabled = false,
  className = "",
}: InputProps) {
  const baseStyles = "w-full rounded-lg font-medium transition-all focus:outline-none";

  const variantStyles = {
    default: "bg-background text-text border border-gray-600 focus:ring-2 focus:ring-primary",
    outline: "border border-text bg-transparent text-text focus:ring-2 focus:ring-primary",
    filled: "bg-primary text-background border-none focus:ring-2 focus:ring-accent",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
}
