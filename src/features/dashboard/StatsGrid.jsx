import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiTrendingUp, FiZap } from "react-icons/fi";
import Card from "../../components/ui/Card";
import { startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";

/**
 * StatCard component
 * Displays a single statistic with icon and label
 */
const StatCard = ({ icon: Icon, label, value, color = "primary", trend }) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    success:
      "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20",
    warning:
      "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20",
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-2">{trend}</p>
          )}
        </div>

        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>

      {/* Decorative element */}
      <div
        className={`absolute -bottom-2 -right-2 w-20 h-20 ${colorClasses[color]} rounded-full blur-2xl opacity-20`}
      />
    </Card>
  );
};

/**
 * StatsGrid component
 * Grid of statistics cards
 */
const StatsGrid = ({ streak = 0, logs = [] }) => {
  // Calculate stats from logs
  const totalHours = logs.reduce(
    (sum, log) => sum + (parseFloat(log.hours_studied) || 0),
    0
  );
  const studyDays = logs.length;

  // Calculate this week's stats
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Sunday
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 }); // Saturday

  const weekLogs = logs.filter((log) => {
    try {
      const logDate = parseISO(log.study_date);
      return isWithinInterval(logDate, { start: weekStart, end: weekEnd });
    } catch {
      return false;
    }
  });

  const weekStudyDays = weekLogs.length;
  const weekHours = weekLogs.reduce(
    (sum, log) => sum + (parseFloat(log.hours_studied) || 0),
    0
  );

  // Calculate average
  const avgHoursPerDay = studyDays > 0 ? totalHours / studyDays : 0;

  const statsConfig = [
    {
      icon: FiZap,
      label: "Current Streak",
      value: `${streak} ${streak === 1 ? "day" : "days"}`,
      color: "warning",
      trend: streak > 0 ? "Keep it up! 🔥" : "Start your streak today!",
    },
    {
      icon: FiClock,
      label: "Total Hours",
      value: totalHours.toFixed(1),
      color: "primary",
      trend: `${studyDays} study ${studyDays === 1 ? "day" : "days"}`,
    },
    {
      icon: FiCalendar,
      label: "This Week",
      value: `${weekStudyDays} ${weekStudyDays === 1 ? "day" : "days"}`,
      color: "secondary",
      trend: weekStudyDays >= 5 ? "Excellent!" : "Keep going!",
    },
    {
      icon: FiTrendingUp,
      label: "Average",
      value: `${avgHoursPerDay.toFixed(1)}h`,
      color: "success",
      trend: "per study day",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {statsConfig.map((stat, index) => (
        <motion.div key={index} variants={item}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export { StatsGrid };
