import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import remindersData from "../data/reminders.json";

/**
 * Hook to manage smart reminders for study logging
 * Shows personalized reminder at 5pm Ghana time if not logged today
 */
export const useStudyReminder = (hasLoggedToday) => {
  const [reminderShown, setReminderShown] = useState(false);

  useEffect(() => {
    // Skip if already logged today or reminder already shown
    if (hasLoggedToday || reminderShown) {
      return;
    }

    const checkAndShowReminder = () => {
      const now = new Date();

      // Ghana is UTC+0 (GMT)
      // Get current time in Ghana (UTC)
      const ghanaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Africa/Accra" })
      );
      const hours = ghanaTime.getHours();
      const minutes = ghanaTime.getMinutes();

      // Show reminder at 5:00 PM Ghana time (17:00)
      if (hours === 17 && minutes === 0 && !reminderShown) {
        showReminder();
      }
    };

    // Check immediately
    checkAndShowReminder();

    // Check every minute
    const interval = setInterval(checkAndShowReminder, 60000);

    return () => clearInterval(interval);
  }, [hasLoggedToday, reminderShown]);

  const showReminder = () => {
    // Get random reminder message
    const randomIndex = Math.floor(
      Math.random() * remindersData.reminders.length
    );
    const message = remindersData.reminders[randomIndex];

    // Show toast notification
    toast(message, {
      icon: "🌺",
      duration: 8000,
      style: {
        background: "#fef3c7",
        color: "#78350f",
        border: "2px solid #fbbf24",
        borderRadius: "0.75rem",
        padding: "16px 20px",
        fontSize: "15px",
        fontWeight: "500",
        maxWidth: "500px",
      },
    });

    setReminderShown(true);

    // Save to localStorage to avoid showing again today
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("reminderShown", today);
  };

  // Reset reminder shown flag for testing (optional)
  const resetReminder = () => {
    setReminderShown(false);
    localStorage.removeItem("reminderShown");
  };

  return { showReminder, resetReminder };
};

export default useStudyReminder;
