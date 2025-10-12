import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useStreak } from "../hooks/useStreak";
import { useQuotes } from "../hooks/useQuotes";
import { useStudyLogs } from "../hooks/useStudyLogs";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Loading from "../components/ui/Loading";
import { StatsGrid } from "../features/dashboard/StatsGrid";
import FlowerGrowth from "../features/streak/FlowerGrowth";
import QuoteCard from "../features/quotes/QuoteCard";
import { StudyLogForm } from "../features/logs/StudyLogForm";
import StudyCalendar from "../features/dashboard/StudyCalendar";
import WeeklyProgressChart from "../features/dashboard/WeeklyProgressChart";

/**
 * DashboardPage component
 * Main dashboard showing all user stats, progress, and study tracking
 */
const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Fetch data
  const { logs, isLoading: logsLoading } = useStudyLogs();
  const { data: streakData, isLoading: streakLoading } = useStreak();
  const { quote, refreshQuote } = useQuotes();

  // Handle study log submission
  const handleLogSubmit = () => {
    setIsLogModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (logsLoading || streakLoading) {
    return <Loading fullScreen message="Loading your journey..." />;
  }

  // Check if logged today
  const today = new Date().toISOString().split("T")[0];
  const hasLoggedToday = logs?.some((log) => log.study_date === today);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, {user?.email?.split("@")[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {hasLoggedToday
                  ? "Great job logging your study time today!"
                  : "Ready to track today's progress?"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </Button>

              {/* Sign out */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <FiLogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Action Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              size="lg"
              onClick={() => setIsLogModalOpen(true)}
              className="w-full sm:w-auto"
            >
              <FiPlus className="mr-2" />
              {hasLoggedToday ? "Update Today's Log" : "Log Today's Study"}
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <StatsGrid streak={streakData || 0} logs={logs || []} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Flower Growth */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FlowerGrowth streak={streakData || 0} />
              </motion.div>

              {/* Motivational Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <QuoteCard quote={quote} onRefresh={refreshQuote} />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Weekly Progress Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <WeeklyProgressChart logs={logs || []} />
              </motion.div>

              {/* Study Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <StudyCalendar logs={logs || []} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Study Log Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title={
          hasLoggedToday ? "Update Today's Study Log" : "Log Today's Study"
        }
      >
        <StudyLogForm onSuccess={handleLogSubmit} />
      </Modal>
    </div>
  );
};

export default DashboardPage;
