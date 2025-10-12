import { useState, useEffect } from "react";
import quotesData from "../data/quotes.json";

/**
 * Hook to manage motivational quotes
 * Provides daily quote and ability to get random quotes
 */
export const useQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quotes] = useState(quotesData.quotes);

  /**
   * Get quote for today based on date
   * This ensures the same quote appears for the entire day
   */
  const getDailyQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );

    // Use day of year to select a consistent quote for the day
    const index = dayOfYear % quotes.length;
    return quotes[index];
  };

  /**
   * Get a random quote
   */
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  /**
   * Get next quote (cycles through quotes)
   */
  const getNextQuote = () => {
    if (!currentQuote) {
      return getRandomQuote();
    }

    const currentIndex = quotes.findIndex((q) => q.id === currentQuote.id);
    const nextIndex = (currentIndex + 1) % quotes.length;
    return quotes[nextIndex];
  };

  /**
   * Refresh to a new random quote
   */
  const refreshQuote = () => {
    const newQuote = getRandomQuote();
    setCurrentQuote(newQuote);
  };

  /**
   * Go to next quote in sequence
   */
  const nextQuote = () => {
    const next = getNextQuote();
    setCurrentQuote(next);
  };

  /**
   * Get quote by ID
   */
  const getQuoteById = (id) => {
    return quotes.find((q) => q.id === id);
  };

  /**
   * Get multiple random quotes
   */
  const getMultipleQuotes = (count = 5) => {
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Initialize with daily quote on mount
  useEffect(() => {
    const dailyQuote = getDailyQuote();
    setCurrentQuote(dailyQuote);
  }, []);

  return {
    currentQuote,
    allQuotes: quotes,
    getDailyQuote,
    getRandomQuote,
    refreshQuote,
    nextQuote,
    getQuoteById,
    getMultipleQuotes,
  };
};
