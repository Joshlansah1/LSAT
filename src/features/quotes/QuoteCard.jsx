import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

/**
 * QuoteCard component
 * Displays a motivational quote with animation
 */
const QuoteCard = ({ quote, onRefresh, showRefreshButton = true }) => {
  if (!quote) {
    return null;
  }

  return (
    <Card className="relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-100 dark:bg-secondary-900/20 rounded-full blur-3xl -z-10" />

      <motion.div
        key={quote.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start gap-4">
          {/* Quote icon */}
          <div className="flex-shrink-0 text-4xl text-primary-500 dark:text-primary-400">
            "
          </div>

          {/* Quote content */}
          <div className="flex-1">
            <blockquote className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 mb-3">
              {quote.text}
            </blockquote>
            <cite className="text-sm sm:text-base text-gray-600 dark:text-gray-400 not-italic">
              — {quote.author}
            </cite>
          </div>

          {/* Closing quote icon */}
          <div className="flex-shrink-0 text-4xl text-primary-500 dark:text-primary-400 self-end">
            "
          </div>
        </div>

        {/* Refresh button */}
        {showRefreshButton && onRefresh && (
          <div className="mt-6 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              icon={FiRefreshCw}
              ariaLabel="Get a new quote"
            >
              New Quote
            </Button>
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default QuoteCard;
