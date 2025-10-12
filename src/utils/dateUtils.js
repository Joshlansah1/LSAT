import {
  format,
  parseISO,
  differenceInDays,
  startOfDay,
  endOfDay,
} from "date-fns";

/**
 * Format a date to display string
 * @param {Date|string} date - The date to format
 * @param {string} formatStr - The format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

/**
 * Get start of day timestamp
 * @param {Date} date - The date
 * @returns {Date} Start of day
 */
export const getStartOfDay = (date = new Date()) => {
  return startOfDay(date);
};

/**
 * Get end of day timestamp
 * @param {Date} date - The date
 * @returns {Date} End of day
 */
export const getEndOfDay = (date = new Date()) => {
  return endOfDay(date);
};

/**
 * Calculate days between two dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {number} Number of days
 */
export const daysBetween = (startDate, endDate) => {
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  const end = typeof endDate === "string" ? parseISO(endDate) : endDate;
  return differenceInDays(end, start);
};

/**
 * Check if a date is today
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  const today = getTodayDate();
  const checkDate =
    typeof date === "string" ? date : format(date, "yyyy-MM-dd");
  return today === checkDate;
};

/**
 * Get date range for the current week
 * @returns {Object} Object with startDate and endDate
 */
export const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  };
};

/**
 * Get date range for the current month
 * @returns {Object} Object with startDate and endDate
 */
export const getCurrentMonthRange = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  };
};
