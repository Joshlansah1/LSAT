/**
 * Validation helper functions for forms
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean|string} True if valid, error message if invalid
 */
export const validateEmail = (email) => {
  if (!email) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return true;
};

/**
 * React Hook Form validation rules
 */
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters",
  },
};

export const hoursValidation = {
  required: "Hours studied is required",
  min: {
    value: 0.1,
    message: "Must be at least 0.1 hours",
  },
  max: {
    value: 24,
    message: "Cannot exceed 24 hours",
  },
};

export const moodValidation = {
  required: "Please select your mood",
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean|string} True if valid, error message if invalid
 */
export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  return true;
};

/**
 * Validate study hours
 * @param {number} hours - Hours to validate
 * @returns {boolean|string} True if valid, error message if invalid
 */
export const validateStudyHours = (hours) => {
  if (hours === null || hours === undefined || hours === "") {
    return "Please enter study hours";
  }

  const hoursNum = parseFloat(hours);

  if (isNaN(hoursNum)) {
    return "Please enter a valid number";
  }

  if (hoursNum < 0) {
    return "Study hours cannot be negative";
  }

  if (hoursNum > 24) {
    return "Study hours cannot exceed 24 hours";
  }

  return true;
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {boolean|string} True if valid, error message if invalid
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return `${fieldName} is required`;
  }
  return true;
};

/**
 * Format error message from Supabase or other sources
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  // Supabase auth errors
  if (error.message?.includes("Invalid login credentials")) {
    return "Invalid email or password. Please try again.";
  }

  if (error.message?.includes("User already registered")) {
    return "An account with this email already exists.";
  }

  if (error.message?.includes("Email not confirmed")) {
    return "Please confirm your email address before logging in.";
  }

  // Network errors
  if (error.message?.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }

  // Default to the original error message
  return error.message || "An error occurred. Please try again.";
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 1000); // Limit length
};
