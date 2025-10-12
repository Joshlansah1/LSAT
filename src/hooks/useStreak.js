import { useMemo } from "react";
import { useStudyLogs } from "./useStudyLogs";
import {
  calculateStreak,
  getStreakMessage,
  getFlowerStage,
  getTotalStudyHours,
  getStudyDaysCount,
  getAverageStudyHours,
  studiedToday,
} from "../utils/streakUtils";

/**
 * Hook to manage streak calculations and statistics
 * Returns all streak-related data and flower growth stage
 */
export const useStreak = () => {
  const { data: studyLogs, isLoading, error } = useStudyLogs();

  // Calculate streak
  const streak = useMemo(() => {
    if (!studyLogs) return 0;
    return calculateStreak(studyLogs);
  }, [studyLogs]);

  // Get streak message
  const streakMessage = useMemo(() => {
    return getStreakMessage(streak);
  }, [streak]);

  // Get flower stage
  const flowerStage = useMemo(() => {
    return getFlowerStage(streak);
  }, [streak]);

  // Get total study hours
  const totalHours = useMemo(() => {
    if (!studyLogs) return 0;
    return getTotalStudyHours(studyLogs);
  }, [studyLogs]);

  // Get study days count
  const studyDays = useMemo(() => {
    if (!studyLogs) return 0;
    return getStudyDaysCount(studyLogs);
  }, [studyLogs]);

  // Get average study hours
  const averageHours = useMemo(() => {
    if (!studyLogs) return 0;
    return getAverageStudyHours(studyLogs);
  }, [studyLogs]);

  // Check if studied today
  const hasStudiedToday = useMemo(() => {
    if (!studyLogs) return false;
    return studiedToday(studyLogs);
  }, [studyLogs]);

  // Get this week's study days
  const weekStudyDays = useMemo(() => {
    if (!studyLogs) return 0;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    weekStart.setHours(0, 0, 0, 0);

    return studyLogs.filter((log) => {
      const logDate = new Date(log.study_date);
      return logDate >= weekStart;
    }).length;
  }, [studyLogs]);

  return {
    streak,
    streakMessage,
    flowerStage,
    totalHours,
    studyDays,
    averageHours,
    hasStudiedToday,
    weekStudyDays,
    isLoading,
    error,
  };
};
