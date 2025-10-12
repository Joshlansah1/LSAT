import { motion } from "framer-motion";

/**
 * Card component for consistent content containers
 * With optional hover effects and animations
 */
const Card = ({
  children,
  className = "",
  hover = false,
  padding = "normal",
  onClick,
  ariaLabel,
  role,
}) => {
  const baseStyles =
    "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm smooth-transition";

  const hoverStyles = hover
    ? "hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer"
    : "";

  const paddingStyles = {
    none: "",
    sm: "p-3",
    normal: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const clickableProps = onClick
    ? {
        onClick,
        role: role || "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(e);
          }
        },
      }
    : {};

  const combinedClassName = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`;

  if (hover || onClick) {
    return (
      <motion.div
        className={combinedClassName}
        aria-label={ariaLabel}
        whileHover={hover ? { y: -2 } : {}}
        whileTap={onClick ? { scale: 0.99 } : {}}
        {...clickableProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} aria-label={ariaLabel}>
      {children}
    </div>
  );
};

export default Card;
