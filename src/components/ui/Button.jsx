import { forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * Button component with various variants and accessibility features
 * Fully accessible with proper ARIA attributes and keyboard navigation
 */
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      type = "button",
      onClick,
      className = "",
      ariaLabel,
      icon: Icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg smooth-transition focus-ring disabled:opacity-50 disabled:cursor-not-allowed";

    // Size variants
    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    // Color variants
    const variantStyles = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 dark:bg-primary-500 dark:hover:bg-primary-600",
      secondary:
        "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 dark:bg-secondary-500 dark:hover:bg-secondary-600",
      outline:
        "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
      ghost:
        "text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`;

    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {Icon && iconPosition === "left" && !loading && (
          <Icon className="mr-2 h-5 w-5" aria-hidden="true" />
        )}
        {children}
        {Icon && iconPosition === "right" && !loading && (
          <Icon className="ml-2 h-5 w-5" aria-hidden="true" />
        )}
      </>
    );

    return (
      <motion.button
        ref={ref}
        type={type}
        className={combinedClassName}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={
          ariaLabel || (typeof children === "string" ? children : undefined)
        }
        aria-busy={loading}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
