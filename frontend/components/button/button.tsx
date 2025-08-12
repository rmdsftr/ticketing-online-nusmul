import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "@/styles/components/button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "secondary" | "tersier" |"danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  iconLeft,
  iconRight,
  loading = false,
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: Props) {
  const variantClass = styles[variant] || "";
  const colorClass = styles[`${variant}-${color}`] || "";
  const sizeClass = styles[size] || "";

  return (
    <button
      className={clsx(
        styles.base,
        variantClass,
        colorClass,
        sizeClass,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className={styles.spinner} />
      )}
      {!loading && iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children}
      {!loading && iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
}
