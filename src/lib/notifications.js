/**
 * OneSignal Push Notifications Configuration
 * Using OneSignal Web SDK v16 with CDN approach
 */

const ONESIGNAL_APP_ID = import.meta.env.VITE_ONESIGNAL_APP_ID;
let isInitialized = false;
let scriptLoaded = false;

/**
 * Initialize OneSignal for push notifications
 * This enables daily study reminders even when the app is closed
 */
export const initializeNotifications = async () => {
  if (isInitialized) {
    console.log("OneSignal already initialized");
    return true;
  }

  if (!ONESIGNAL_APP_ID) {
    console.warn(
      "OneSignal App ID not configured. Push notifications disabled."
    );
    return false;
  }

  try {
    // Load OneSignal SDK from CDN only once
    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
      script.defer = true;
      document.head.appendChild(script);
      scriptLoaded = true;
    }

    // Initialize OneSignal with modern SDK
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      // Check if already initialized
      if (isInitialized) {
        return;
      }

      await OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false,
        },
      });

      // Show notification permission prompt
      await OneSignal.Slidedown.promptPush();

      isInitialized = true;
      console.log("✅ OneSignal initialized successfully");
    });

    return true;
  } catch (error) {
    console.error("Failed to initialize OneSignal:", error);
    return false;
  }
};

/**
 * Set user ID for targeted notifications
 * Call this after user logs in
 */
export const setNotificationUserId = async (userId) => {
  if (!userId) return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(function (OneSignal) {
    OneSignal.login(userId);
    console.log("✅ OneSignal user ID set:", userId);
  });
};

/**
 * Send tags to OneSignal for personalized notifications
 * Example: { user_name: "Geraudia", current_streak: "7" }
 */
export const setNotificationTags = async (tags) => {
  if (!tags || typeof tags !== "object") return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(function (OneSignal) {
    OneSignal.User.addTags(tags);
    console.log("✅ OneSignal tags updated:", tags);
  });
};

/**
 * Check if user has granted notification permission
 */
export const areNotificationsEnabled = async () => {
  return new Promise((resolve) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      const permission = await OneSignal.Notifications.permission;
      resolve(permission === "granted");
    });
  });
};

/**
 * Remove notification tags
 */
export const removeNotificationTags = async (tagKeys) => {
  if (!tagKeys || !Array.isArray(tagKeys)) return;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(function (OneSignal) {
    OneSignal.User.removeTags(tagKeys);
    console.log("✅ OneSignal tags removed:", tagKeys);
  });
};

/**
 * Get notification permission status
 */
export const getNotificationPermission = async () => {
  return new Promise((resolve) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      const permission = await OneSignal.Notifications.permission;
      resolve(permission);
    });
  });
};

/**
 * Manually show notification prompt
 * Use this if you want to show the prompt at a specific time
 */
export const showNotificationPrompt = () => {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(function (OneSignal) {
    OneSignal.Slidedown.promptPush();
  });
};
