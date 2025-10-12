import { forwardRef } from "react";

/**
 * Input component with label and error handling
 * Fully accessible with proper ARIA attributes
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      type = "text",
      required = false,
      disabled = false,
      fullWidth = false,
      placeholder,
      id,
      name,
      className = "",
      containerClassName = "",
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const baseInputStyles =
      "block w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border rounded-lg focus-ring smooth-transition disabled:opacity-50 disabled:cursor-not-allowed";

    const borderStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500";

    const iconPadding = Icon ? "pl-10" : "";

    const inputClassName = `${baseInputStyles} ${borderStyles} ${iconPadding} ${className}`;

    const containerWidth = fullWidth ? "w-full" : "";

    return (
      <div className={`${containerWidth} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClassName}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
