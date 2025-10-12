import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID;

/**
 * Initialize OneSignal for push notifications
 * This enables daily study reminders even when the app is closed
 * CURRENTLY DISABLED - Enable when ready
 */
export const initializeNotifications = async () => {
  // Temporarily disabled
  console.log("OneSignal: Disabled for now");
  return false;

  /* Uncomment when ready to use
  if (!ONESIGNAL_APP_ID) {
    console.warn(
      "OneSignal App ID not configured. Push notifications disabled."
    );
    return false;
  }

  try {
    await OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false,
      },
      welcomeNotification: {
        disable: false,
        title: "Welcome to Geraudia's LSAT Journey!",
        message: "You'll receive daily reminders to keep your streak alive! 🌸",
      },
    });

    // Request notification permission
    await OneSignal.showNativePrompt();

    return true;
  } catch (error) {
    console.error("Failed to initialize OneSignal:", error);
    return false;
  }
  */
};

/**
 * Set user ID for targeted notifications
 * CURRENTLY DISABLED
 */
export const setNotificationUserId = async (userId) => {
  // Temporarily disabled
  console.log("OneSignal: setNotificationUserId disabled");
  return;

  /* Uncomment when ready to use
  try {
    await OneSignal.setExternalUserId(userId);
  } catch (error) {
    console.error("Failed to set OneSignal user ID:", error);
  }
  */
};

/**
 * Send a tag to OneSignal (for segmentation)
 * Example: current streak count, study goal, etc.
 */
export const setNotificationTags = async (tags) => {
  try {
    await OneSignal.sendTags(tags);
  } catch (error) {
    console.error("Failed to set OneSignal tags:", error);
  }
};

/**
 * Check if notifications are enabled
 */
export const areNotificationsEnabled = async () => {
  try {
    return await OneSignal.isPushNotificationsEnabled();
  } catch (error) {
    console.error("Failed to check notification status:", error);
    return false;
  }
};

/**
 * Remove notification tags
 */
export const removeNotificationTags = async (tagKeys) => {
  try {
    await OneSignal.deleteTags(tagKeys);
  } catch (error) {
    console.error("Failed to remove OneSignal tags:", error);
  }
};

/**
 * Get notification permission status
 */
export const getNotificationPermission = async () => {
  try {
    return await OneSignal.getNotificationPermission();
  } catch (error) {
    console.error("Failed to get notification permission:", error);
    return "denied";
  }
};
