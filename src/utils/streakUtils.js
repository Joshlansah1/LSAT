/**
 * Calculate consecutive study streak from study logs
 * @param {Array} studyLogs - Array of study log objects with study_date
 * @returns {number} Current streak count
 */
export const calculateStreak = (studyLogs) => {
  if (!studyLogs || studyLogs.length === 0) return 0;

  // Sort logs by date descending (most recent first)
  const sortedLogs = [...studyLogs].sort((a, b) => {
    return new Date(b.study_date) - new Date(a.study_date);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Get the most recent log date
  const mostRecentLog = new Date(sortedLogs[0].study_date);
  mostRecentLog.setHours(0, 0, 0, 0);

  // If most recent log is not today or yesterday, streak is broken
  if (mostRecentLog < yesterday) {
    return 0;
  }

  let streak = 0;
  let expectedDate = today;

  // If most recent log is yesterday, start counting from yesterday
  if (mostRecentLog.getTime() === yesterday.getTime()) {
    expectedDate = yesterday;
  }

  // Count consecutive days
  for (const log of sortedLogs) {
    const logDate = new Date(log.study_date);
    logDate.setHours(0, 0, 0, 0);

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate = new Date(expectedDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (logDate < expectedDate) {
      // Gap in dates - streak is broken
      break;
    }
  }

  return streak;
};

/**
 * Get streak message based on current streak
 * @param {number} streak - Current streak count
 * @returns {string} Motivational message
 */
export const getStreakMessage = (streak) => {
  if (streak === 0) {
    return "Start your journey today! 🌱";
  } else if (streak === 1) {
    return "Great start! Keep it going! 🌿";
  } else if (streak < 7) {
    return "You're building momentum! 🌸";
  } else if (streak < 30) {
    return "Amazing consistency! 🌺";
  } else if (streak < 100) {
    return "You're unstoppable! 🌻";
  } else {
    return "Legendary dedication! 🏆";
  }
};

/**
 * Get flower stage based on streak
 * @param {number} streak - Current streak count
 * @returns {string} Flower stage: 'seed', 'sprout', 'bud', 'bloom', 'garden'
 */
export const getFlowerStage = (streak) => {
  if (streak === 0) return "seed";
  if (streak < 3) return "sprout";
  if (streak < 7) return "bud";
  if (streak < 30) return "bloom";
  return "garden";
};

/**
 * Get total study hours from logs
 * @param {Array} studyLogs - Array of study log objects
 * @returns {number} Total hours
 */
export const getTotalStudyHours = (studyLogs) => {
  if (!studyLogs || studyLogs.length === 0) return 0;

  return studyLogs.reduce((total, log) => {
    return total + (parseFloat(log.hours_studied) || 0);
  }, 0);
};

/**
 * Get study days count
 * @param {Array} studyLogs - Array of study log objects
 * @returns {number} Number of unique study days
 */
export const getStudyDaysCount = (studyLogs) => {
  if (!studyLogs || studyLogs.length === 0) return 0;

  const uniqueDates = new Set(studyLogs.map((log) => log.study_date));
  return uniqueDates.size;
};

/**
 * Get average study hours per day
 * @param {Array} studyLogs - Array of study log objects
 * @returns {number} Average hours
 */
export const getAverageStudyHours = (studyLogs) => {
  if (!studyLogs || studyLogs.length === 0) return 0;

  const total = getTotalStudyHours(studyLogs);
  const days = getStudyDaysCount(studyLogs);

  return days > 0 ? total / days : 0;
};

/**
 * Check if user studied today
 * @param {Array} studyLogs - Array of study log objects
 * @returns {boolean} True if user studied today
 */
export const studiedToday = (studyLogs) => {
  if (!studyLogs || studyLogs.length === 0) return false;

  const today = new Date().toISOString().split("T")[0];
  return studyLogs.some((log) => log.study_date === today);
};
