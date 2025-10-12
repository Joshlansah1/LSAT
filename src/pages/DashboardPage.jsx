import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMoon, FiSun, FiLogOut, FiRefreshCw } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useStreak } from "../hooks/useStreak";
import { useQuotes } from "../hooks/useQuotes";
import { useStudyLogs } from "../hooks/useStudyLogs";
import { useStudyReminder } from "../hooks/useStudyReminder";
import {
  setNotificationUserId,
  setNotificationTags,
} from "../lib/notifications";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Loading from "../components/ui/Loading";
import { StatsGrid } from "../features/dashboard/StatsGrid";
import FlowerGrowth from "../features/streak/FlowerGrowth";
import QuoteCard from "../features/quotes/QuoteCard";
import { StudyLogForm } from "../features/logs/StudyLogForm";
import StudyCalendar from "../features/dashboard/StudyCalendar";
import WeeklyProgressChart from "../features/dashboard/WeeklyProgressChart";
import StreakRecoveryQuiz from "../features/streak/StreakRecoveryQuiz";

/**
 * DashboardPage component
 * Main dashboard showing all user stats, progress, and study tracking
 */
const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [recoveryAttempts, setRecoveryAttempts] = useState(3);

  // Fetch data
  const { logs, isLoading: logsLoading } = useStudyLogs();
  const { data: streakData, isLoading: streakLoading } = useStreak();
  const { currentQuote: quote, refreshQuote } = useQuotes();

  // Check if logged today (needed for reminder hook)
  const today = new Date().toISOString().split("T")[0];
  const todaysLog = logs?.find((log) => log.study_date === today);
  const hasLoggedToday = !!todaysLog;

  // Smart reminder at 5pm Ghana time - MUST be called before any conditional returns
  useStudyReminder(hasLoggedToday);

  // Set OneSignal user ID and tags for personalized notifications
  useEffect(() => {
    const updateNotificationData = async () => {
      if (!user || !streakData) return;

      // Set user ID for targeted notifications
      await setNotificationUserId(user.id);

      // Calculate streak level
      const streakLevel =
        streakData.currentStreak >= 30
          ? "master"
          : streakData.currentStreak >= 7
          ? "consistent"
          : "beginner";

      // Calculate total hours from logs
      const totalHours =
        logs?.reduce((sum, log) => sum + (log.hours_studied || 0), 0) || 0;

      // Set tags for message personalization and smart delivery
      await setNotificationTags({
        user_name: "Geraudia",
        current_streak: streakData.currentStreak.toString(),
        last_study_date: streakData.lastStudyDate || "",
        total_hours: totalHours.toFixed(1),
        streak_level: streakLevel,
        has_logged_today: hasLoggedToday.toString(),
      });
    };

    updateNotificationData();
  }, [user, streakData, logs, hasLoggedToday]);

  // Load recovery attempts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`recovery_attempts_${user?.id}`);
    if (saved) {
      setRecoveryAttempts(parseInt(saved, 10));
    }
  }, [user?.id]);

  // Save recovery attempts to localStorage
  const updateRecoveryAttempts = (attempts) => {
    setRecoveryAttempts(attempts);
    localStorage.setItem(`recovery_attempts_${user?.id}`, attempts.toString());
  };

  // Handle study log submission
  const handleLogSubmit = () => {
    setIsLogModalOpen(false);
    setEditingLog(null);
  };

  const handleEditLog = (log) => {
    setEditingLog(log);
    setIsLogModalOpen(true);
  };

  const handleRecoverySuccess = () => {
    // Deduct one attempt
    updateRecoveryAttempts(recoveryAttempts - 1);
    setIsRecoveryModalOpen(false);

    // In a real implementation, you'd update the streak in the database
    // For now, just show success and refresh
    window.location.reload();
  };

  const handleRecoveryClose = () => {
    // Deduct one attempt even if closed
    updateRecoveryAttempts(recoveryAttempts - 1);
    setIsRecoveryModalOpen(false);
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

  // Handle "Log/Update Today's Study" button click
  const handleLogButtonClick = () => {
    if (hasLoggedToday && todaysLog) {
      // If already logged today, open in edit mode
      setEditingLog(todaysLog);
    } else {
      // If not logged today, open in create mode
      setEditingLog(null);
    }
    setIsLogModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, Gerdia! 👋
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
          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={handleLogButtonClick}
              className="flex-1 sm:flex-initial"
            >
              <FiPlus className="mr-2" />
              {hasLoggedToday ? "Update Today's Log" : "Log Today's Study"}
            </Button>

            {/* Streak Recovery Button - show only if streak is 0 and attempts remain */}
            {streakData === 0 && recoveryAttempts > 0 && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setIsRecoveryModalOpen(true)}
                className="flex-1 sm:flex-initial"
              >
                <FiRefreshCw className="mr-2" />
                Recover Streak ({recoveryAttempts} left)
              </Button>
            )}
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
                <StudyCalendar logs={logs || []} onEditToday={handleEditLog} />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Study Log Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => {
          setIsLogModalOpen(false);
          setEditingLog(null);
        }}
        title={
          editingLog
            ? "Edit Study Log"
            : hasLoggedToday
            ? "Update Today's Study Log"
            : "Log Today's Study"
        }
      >
        <StudyLogForm onSuccess={handleLogSubmit} initialData={editingLog} />
      </Modal>

      {/* Streak Recovery Modal */}
      <Modal
        isOpen={isRecoveryModalOpen}
        onClose={handleRecoveryClose}
        title="🌺 Recover Your Streak"
        size="lg"
        closeOnOverlayClick={false}
      >
        <StreakRecoveryQuiz
          onSuccess={handleRecoverySuccess}
          onClose={handleRecoveryClose}
          attemptsRemaining={recoveryAttempts}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
