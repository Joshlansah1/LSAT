/**
 * Calculate consecutive study streak from study logs
 * @param {Array} studyLogs - Array of study log objects with study_date
 * @returns {number} Current streak count
 */
export const calculateStreak = (studyLogs) => {
  console.log("🔥 calculateStreak CALLED");
  console.log("📊 Received logs:", studyLogs);

  if (!studyLogs || studyLogs.length === 0) {
    console.log("⚠️ No study logs - returning 0");
    return 0;
  }

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

  console.log("=== STREAK CALCULATION DEBUG ===");
  console.log("📅 Today:", today.toISOString().split("T")[0]);
  console.log("📅 Yesterday:", yesterday.toISOString().split("T")[0]);
  console.log("📅 Most recent log:", mostRecentLog.toISOString().split("T")[0]);
  console.log(
    "📅 All study dates:",
    sortedLogs.map((log) => log.study_date)
  );

  // If most recent log is not today or yesterday, streak is broken
  if (mostRecentLog < yesterday) {
    console.log("❌ Streak broken: most recent log is before yesterday");
    console.log("================================");
    return 0;
  }

  let streak = 0;
  let expectedDate = today;

  // If most recent log is yesterday, start counting from yesterday
  if (mostRecentLog.getTime() === yesterday.getTime()) {
    expectedDate = yesterday;
    console.log("⏮️ Starting from yesterday");
  } else {
    console.log("⏮️ Starting from today");
  }

  // Count consecutive days
  for (const log of sortedLogs) {
    const logDate = new Date(log.study_date);
    logDate.setHours(0, 0, 0, 0);

    console.log(
      `🔍 Checking: ${logDate.toISOString().split("T")[0]} vs expected ${
        expectedDate.toISOString().split("T")[0]
      }`
    );

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++;
      console.log(`✅ Match! Streak now: ${streak}`);
      expectedDate = new Date(expectedDate);
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (logDate < expectedDate) {
      // Gap in dates - streak is broken
      console.log("❌ Gap in dates - streak broken");
      break;
    }
  }

  console.log("🏆 Final streak:", streak);
  console.log("================================");
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
 * Get collected flowers based on streak milestones
 * Each 7-day milestone unlocks a new flower for your garden
 * @param {number} streak - Current streak count
 * @returns {Array} Array of flower objects with emoji, name, and unlockDay
 */
export const getCollectedFlowers = (streak) => {
  const flowers = [
    { emoji: "🌻", name: "Sunflower", unlockDay: 7, color: "text-yellow-500" },
    { emoji: "🌹", name: "Rose", unlockDay: 14, color: "text-red-500" },
    { emoji: "🌷", name: "Tulip", unlockDay: 21, color: "text-pink-500" },
    { emoji: "🌺", name: "Hibiscus", unlockDay: 28, color: "text-pink-600" },
    { emoji: "🪷", name: "Lotus", unlockDay: 35, color: "text-pink-400" },
    { emoji: "🌼", name: "Daisy", unlockDay: 42, color: "text-yellow-400" },
    { emoji: "🏵️", name: "Rosette", unlockDay: 49, color: "text-rose-500" },
    { emoji: "💐", name: "Bouquet", unlockDay: 56, color: "text-purple-500" },
    { emoji: "🪻", name: "Hyacinth", unlockDay: 63, color: "text-purple-400" },
    {
      emoji: "🌸",
      name: "Cherry Blossom",
      unlockDay: 70,
      color: "text-pink-300",
    },
    {
      emoji: "🥀",
      name: "Wilted Rose",
      unlockDay: 77,
      color: "text-rose-600",
      description: "Beauty in perseverance",
    },
    {
      emoji: "🪴",
      name: "Potted Plant",
      unlockDay: 84,
      color: "text-green-600",
    },
    {
      emoji: "🌾",
      name: "Sheaf of Rice",
      unlockDay: 91,
      color: "text-amber-600",
    },
    {
      emoji: "🍀",
      name: "Four Leaf Clover",
      unlockDay: 98,
      color: "text-green-500",
      description: "Lucky dedication!",
    },
    {
      emoji: "🏆",
      name: "Trophy Garden",
      unlockDay: 100,
      color: "text-yellow-600",
      description: "100 days of excellence!",
    },
  ];

  return flowers.filter((flower) => streak >= flower.unlockDay);
};

/**
 * Get the next flower to unlock
 * @param {number} streak - Current streak count
 * @returns {Object|null} Next flower object or null if all unlocked
 */
export const getNextFlower = (streak) => {
  const allFlowers = [
    { emoji: "🌻", name: "Sunflower", unlockDay: 7 },
    { emoji: "🌹", name: "Rose", unlockDay: 14 },
    { emoji: "🌷", name: "Tulip", unlockDay: 21 },
    { emoji: "🌺", name: "Hibiscus", unlockDay: 28 },
    { emoji: "🪷", name: "Lotus", unlockDay: 35 },
    { emoji: "🌼", name: "Daisy", unlockDay: 42 },
    { emoji: "🏵️", name: "Rosette", unlockDay: 49 },
    { emoji: "💐", name: "Bouquet", unlockDay: 56 },
    { emoji: "🪻", name: "Hyacinth", unlockDay: 63 },
    { emoji: "🌸", name: "Cherry Blossom", unlockDay: 70 },
    { emoji: "🥀", name: "Wilted Rose", unlockDay: 77 },
    { emoji: "🪴", name: "Potted Plant", unlockDay: 84 },
    { emoji: "🌾", name: "Sheaf of Rice", unlockDay: 91 },
    { emoji: "🍀", name: "Four Leaf Clover", unlockDay: 98 },
    { emoji: "🏆", name: "Trophy Garden", unlockDay: 100 },
  ];

  const nextFlower = allFlowers.find((flower) => streak < flower.unlockDay);

  if (nextFlower) {
    return {
      ...nextFlower,
      daysRemaining: nextFlower.unlockDay - streak,
    };
  }

  return null;
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
