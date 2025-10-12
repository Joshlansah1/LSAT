import { motion } from "framer-motion";

/**
 * Loading spinner component
 * Accessible with proper ARIA attributes
 */
const Loading = ({
  size = "md",
  fullScreen = false,
  message = "Loading...",
}) => {
  const sizeStyles = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeStyles[size]} border-primary-600 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        role="status"
        aria-label={message}
      />
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
      )}
      <span className="sr-only">{message}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>;
};

export default Loading;
