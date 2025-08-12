"use client";

import { ReactNode, SelectHTMLAttributes, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "@/styles/components/dropdown.module.css";

interface Option {
  label: string;
  value: string;
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: Option[];
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: "outline" | "solid";
  customSize?: "sm" | "md" | "lg"; 
  className?: string;
  placeholder?: string;
}

export function Dropdown({
  options,
  iconLeft,
  iconRight,
  variant = "outline",
  customSize = "md", 
  className,
  placeholder,
  value,
  onChange,
  disabled,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    
    // Call onChange with synthetic event
    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue },
        currentTarget: { value: optionValue }
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder || "Select...";

  // Determine classes for the trigger button
  const triggerClasses = clsx(
    styles.select,
    {
      [styles.hasIconLeft]: !!iconLeft,
      [styles.hasIconRight]: !!iconRight,
      [styles.placeholder]: !selectedOption,
    }
  );

  return (
    <div 
      ref={dropdownRef}
      className={clsx(
        styles.wrapper, 
        styles[variant], 
        styles[customSize], 
        className,
        { [styles.disabled]: disabled }
      )}
    >
      {/* Hidden select for form compatibility */}
      <select
        style={{ display: 'none' }}
        value={selectedValue}
        onChange={() => {}} // Handled by custom dropdown
        disabled={disabled}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {iconLeft && (
        <span className={styles.iconLeft}>
          {iconLeft}
        </span>
      )}
      
      {/* Custom dropdown trigger */}
      <div
        className={triggerClasses}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        {displayText}
      </div>
      
      {iconRight && (
        <span className={styles.iconRight}>
          {iconRight}
        </span>
      )}

      {/* Custom dropdown menu */}
      {isOpen && !disabled && (
        <div className={styles.dropdownMenu}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={clsx(styles.option, {
                [styles.selected]: opt.value === selectedValue
              })}
              onClick={() => handleSelect(opt.value)}
              role="option"
              aria-selected={opt.value === selectedValue}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}