import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "@/styles/components/input.module.css";
import { poppins } from "@/components/fonts/poppins";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  error?: string;
  variant?: "outline" | "solid" | "ghost";
  color?: "primary" | "danger" | "gray";
  className?: string;
}

export function Input({
  label,
  iconLeft,
  iconRight,
  error,
  variant = "outline",
  color = "primary",
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(`${poppins.variable} ${styles.wrapper}`, className)}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={clsx(
          styles.inputContainer,
          styles[variant],
          styles[color],
          error && styles.error
        )}
      >
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input className={`${poppins} ${styles.input}`} {...props} />
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
