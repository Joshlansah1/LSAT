# 🔔 OneSignal Push Notifications Setup Guide

## Complete Guide for iPhone Daily Reminders

This guide will help you set up OneSignal push notifications so Geraudia receives daily reminders on her iPhone to log study hours at 5pm Ghana time.

---

## 📱 Important: How iOS Safari Push Notifications Work

### iOS/iPhone Requirements
- ✅ **Works on iOS 16.4+** (March 2023 and newer)
- ✅ **Safari browser only** (not Chrome/Firefox on iPhone)
- ✅ **HTTPS required in production** (localhost works for testing)
- ✅ **"Add to Home Screen" recommended** for best experience
- ✅ **Notifications work even when app is closed** 🎉

### Key Differences from Android
- iPhone notifications appear in Notification Center
- User must explicitly allow notifications
- Best experience when app is added to Home Screen
- Works perfectly in production on Vercel/Netlify (HTTPS automatic)

---

## 🚀 Step 1: Create OneSignal Account (5 minutes)

### 1.1 Sign Up
1. Go to **[onesignal.com](https://onesignal.com)**
2. Click **"Get Started Free"**
3. Sign up with email (completely free, no credit card needed)
4. Verify your email

### 1.2 Create New App
1. Click **"New App/Website"**
2. **App Name**: `Geraudia LSAT Journey`
3. Click **"Create"**

---

## 🌐 Step 2: Configure Web Push for iPhone (10 minutes)

### 2.1 Platform Configuration
1. In your OneSignal dashboard, click **"Settings"** → **"Platforms"**
2. Select **"Web Push"**
3. Click **"Configure"**

### 2.2 Web Configuration Settings
Fill in the following:

**Site Name**: `Geraudia's LSAT Journey`

**Site URL** (choose based on environment):
- **Development**: `http://localhost:5173`
- **Production**: Your Vercel/Netlify URL (e.g., `https://geraudia-lsat.vercel.app`)

**Auto Resubscribe**: `ON` (recommended)

**Default Notification Icon URL** (optional):
- Upload a 256x256 PNG image
- Or use: `https://onesignal.com/images/notification-icons/icon.png` (default)

### 2.3 Safari Web Push (IMPORTANT for iPhone!)
1. Scroll down to **"Apple Safari"** section
2. **Enable Safari**: Toggle `ON`
3. For now, leave as default (we can add custom icon later)
4. Click **"Save"**

### 2.4 Permission Prompt Settings
1. Go to **"Settings"** → **"Web Push"** → **"Permission Prompt"**
2. **Native Browser Prompt**: Set to `Slide Prompt`
3. **Prompt Message**: 
   ```
   Get daily reminders at 5pm to log your study hours and keep your streak alive! 🌸
   ```
4. **Allow Button Text**: `Enable Reminders`
5. **Deny Button Text**: `Not Now`
6. Click **"Save"**

---

## 🔑 Step 3: Get Your App ID

### 3.1 Copy App ID
1. Go to **"Settings"** → **"Keys & IDs"**
2. Find **"OneSignal App ID"**
3. Copy the ID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 3.2 Add to .env File
1. Open `.env` file in your project
2. Replace the empty OneSignal App ID line:
   ```env
   VITE_ONESIGNAL_APP_ID=paste-your-app-id-here
   ```
3. **Save the file**
4. **Restart your dev server** (important!)

---

## 📅 Step 4: Set Up Automated Daily Reminders (15 minutes)

Now we'll create automated push notifications that send at 5pm Ghana time every day.

### 4.1 Create Automated Message
1. In OneSignal dashboard, go to **"Messages"** → **"Automated"**
2. Click **"New Automated Message"**
3. Select **"Time-based"**

### 4.2 Configure the Message

**Message Name**: `Daily 5pm Study Reminder`

**Delivery**:
- **Schedule**: `Every day at a specific time`
- **Time**: `5:00 PM`
- **Timezone**: `(GMT+0:00) Africa/Accra` (Ghana time)

**Audience**:
- **Send to**: `All Subscribed Users`
- Or create segment: `hasn't logged study today` (advanced - we'll set this up with tags)

### 4.3 Message Content

**Notification Title**: Choose from these options (rotate them!):
```
Option 1: Time to study! 🌸
Option 2: Hey Geraudia! 📚
Option 3: LSAT time! ✨
Option 4: Keep that streak alive! 🔥
```

**Message**: Use data tags (we'll set these up):
```
Option 1: Your LSAT flower is waiting for today's sunshine! Let's keep that {{tags.current_streak}} day streak growing! 🌻

Option 2: It's 5pm! Time to log your study hours and keep the momentum going! You're doing amazing! 💪

Option 3: Don't forget to water your LSAT garden today! {{tags.current_streak}} days of growth so far! 🌸

Option 4: Study time, Geraudia! Your future lawyer self will thank you! ⚖️📖
```

**Launch URL** (where to go when clicked):
```
https://your-production-url.vercel.app
```
(For dev: `http://localhost:5173`)

**Large Icon** (optional): Add a motivational image

**Action Buttons** (optional):
- Button 1: "Log Now" → `https://your-url.com`
- Button 2: "Remind me in 1 hour" → Can set up with segments

### 4.4 Advanced: Conditional Delivery (Smart Reminders)

To only send if she hasn't logged today:

1. Create user segment:
   - Go to **"Audience"** → **"Segments"**
   - Click **"New Segment"**
   - **Name**: `Users who haven't logged today`
   - **Filter**: `Tag: last_study_date` `is not` `today's date`
2. In your automated message, change **Audience** to this segment

---

## 📊 Step 5: Set Up User Tags for Personalization

We'll automatically tag users with their streak count, last study date, and name.

### 5.1 Understanding Tags

OneSignal tags allow personalized notifications:
- `user_name`: "Geraudia"
- `current_streak`: "7" (days)
- `last_study_date`: "2024-10-12"
- `total_hours`: "45.5"
- `streak_level`: "consistent" (beginner/consistent/master)

### 5.2 How Tags Work in the App

The app automatically sends these tags when:
- User logs in ✅
- User logs study hours ✅
- Streak updates ✅

Tags are used for:
- Personalized message content
- Smart delivery (only notify if haven't studied)
- Celebrating milestones

---

## 🧪 Step 6: Testing Notifications

### 6.1 Test on Localhost (Development)

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Open in Safari** (iPhone simulator or actual iPhone):
   - Go to `http://your-computer-ip:5173`
   - Or use `localhost:5173` on Mac

3. **Allow notifications** when prompted

4. **Send a test notification**:
   - Go to OneSignal dashboard
   - **Messages** → **New Push**
   - **Send to**: `Test Users` or `All Users`
   - Write a test message
   - Click **"Send Message"**

5. **Verify**:
   - Check notification appears on iPhone
   - Click it and verify it opens the app

### 6.2 Test on Production (Vercel/Netlify)

After deploying:

1. **Update OneSignal Settings**:
   - **Settings** → **Platforms** → **Web Push**
   - Add your production URL
   - Save

2. **Test on iPhone**:
   - Open your production URL in Safari
   - Add to Home Screen (recommended)
   - Allow notifications
   - Send test message from OneSignal

---

## 📲 Step 7: iPhone User Instructions (For Geraudia)

### How to Enable Notifications on iPhone

1. **Open the app in Safari**
   - Go to your app URL
   - Do NOT use Chrome or other browsers

2. **Add to Home Screen** (Recommended)
   - Tap the Share button (box with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Name it: "My LSAT Journey"
   - Tap "Add"

3. **Allow Notifications**
   - When prompted, tap "Allow"
   - Go to iPhone Settings → Notifications → Safari (or app name)
   - Make sure "Allow Notifications" is ON

4. **You're set!** 🎉
   - You'll get a reminder at 5pm every day
   - Notifications work even when app is closed
   - Tap the notification to open the app and log hours

---

## 🎯 Step 8: Create Multiple Automated Messages (Optional)

Make it more engaging with variety!

### Morning Motivation (7am Ghana time)
```
Title: Good morning, Geraudia! ☀️
Message: Start your day right! Plan when you'll study today to keep that streak alive! 🌸
```

### Evening Reminder (5pm Ghana time) - Already set up above

### Missed Study Alert (9pm Ghana time)
```
Title: Still time to study! ⏰
Message: Don't lose your {{tags.current_streak}} day streak! Even 30 minutes counts! 💪
Condition: Only if last_study_date is not today
```

### Weekly Summary (Sunday 8pm Ghana time)
```
Title: Week Complete! 🎉
Message: You studied {{tags.weekly_hours}} hours this week! Amazing progress, Geraudia! Keep growing! 🌻
Schedule: Weekly on Sundays
```

### Milestone Celebrations
```
Title: MILESTONE! 🏆
Message: {{tags.current_streak}} DAY STREAK! You're unstoppable, Geraudia! 🔥✨
Condition: When streak hits 7, 14, 30, 60, 100 days
```

---

## 🔧 Troubleshooting

### Notifications Not Showing on iPhone

**Problem**: Don't see notification prompt

**Solutions**:
- ✅ Make sure you're using **Safari browser** (not Chrome)
- ✅ Check that HTTPS is enabled in production
- ✅ Verify OneSignal App ID is correct in `.env`
- ✅ Restart dev server after adding App ID
- ✅ Clear Safari cache: Settings → Safari → Clear History and Data

**Problem**: Allowed notifications but not receiving them

**Solutions**:
- ✅ Check iPhone Settings → Notifications → Safari
- ✅ Make sure "Allow Notifications" is ON
- ✅ Check notification is scheduled in OneSignal dashboard
- ✅ Verify timezone is set to Africa/Accra in OneSignal
- ✅ Send a test message from OneSignal to verify delivery

**Problem**: Notifications stop working after a while

**Solutions**:
- ✅ Re-open the app in Safari to refresh subscription
- ✅ Check if user unsubscribed in iPhone Settings
- ✅ Verify OneSignal subscription is active (check Audience → All Users)

---

## 📈 Advanced Features

### User Segmentation

Create targeted messages for different user types:

**Segment: Consistent Studiers (7+ day streak)**
```
Filter: Tag "current_streak" is greater than "6"
Message: "You're crushing it! {{tags.current_streak}} days strong! 🏆"
```

**Segment: Beginners (0-3 day streak)**
```
Filter: Tag "current_streak" is less than "4"
Message: "Keep going! Every day counts toward building your habit! 💪"
```

**Segment: Broke Streak**
```
Filter: Tag "current_streak" equals "0"
Message: "New beginnings! Let's start fresh and build an even bigger streak! 🌱"
```

### A/B Testing Messages

Test which messages motivate Geraudia more:

1. Go to Messages → New Push
2. Enable **A/B Testing**
3. Create variants:
   - Variant A:励志型 "You're doing amazing!"
   - Variant B: 提醒型 "Don't forget to study!"
4. OneSignal will show which performs better

### Rich Media Notifications

Add images to make notifications more engaging:

1. In message composer, add **Large Image**
2. URL examples:
   - Motivational quote image
   - Progress chart screenshot
   - Flower growth stages
3. Makes notifications stand out!

---

## 🔐 Privacy & Best Practices

### User Privacy
- ✅ Only collect necessary tags (streak, study date)
- ✅ No personal information in tags
- ✅ Allow users to opt-out anytime
- ✅ Clear about what notifications they'll receive

### Notification Frequency
- ✅ **Don't over-notify!** Recommended: 1-2 per day max
- ✅ Respect quiet hours (don't send at night)
- ✅ Make it easy to customize frequency (future feature)

### Message Quality
- ✅ Keep messages short and actionable
- ✅ Always include value (motivation, reminder, celebration)
- ✅ Use emojis sparingly but effectively
- ✅ Personalize with user's name and streak

---

## ✅ Final Checklist

Before going live:

- [ ] OneSignal account created
- [ ] Web Push platform configured
- [ ] Safari support enabled
- [ ] App ID added to `.env` file
- [ ] Dev server restarted
- [ ] Tested notification prompt on localhost
- [ ] Automated daily reminder created (5pm Ghana time)
- [ ] Production URL added to OneSignal settings
- [ ] Deployed to Vercel/Netlify
- [ ] Tested on actual iPhone with Safari
- [ ] Geraudia successfully subscribed to notifications
- [ ] First notification received successfully! 🎉

---

## 📚 Additional Resources

- **OneSignal Documentation**: [documentation.onesignal.com](https://documentation.onesignal.com)
- **iOS Web Push Guide**: [onesignal.com/blog/ios-web-push](https://onesignal.com/blog/ios-web-push-notifications/)
- **Testing Guide**: [documentation.onesignal.com/docs/sending-test-notifications](https://documentation.onesignal.com/docs/sending-test-notifications)
- **API Reference**: [documentation.onesignal.com/reference](https://documentation.onesignal.com/reference)

---

## 🆘 Need Help?

**Common Questions:**

Q: Do notifications work when the app is closed?
A: Yes! On iPhone (iOS 16.4+), notifications work even when Safari and the app are closed.

Q: Does it cost money?
A: OneSignal is free for up to 10,000 subscribers. Perfect for personal use!

Q: Will it drain battery?
A: No! OneSignal uses efficient push technology. Minimal battery impact.

Q: Can I customize the notification sound?
A: Sound is controlled by iPhone settings. Users can customize in Settings → Sounds & Haptics.

---

**Built with ❤️ for Geraudia's LSAT success! 🌸📚**

Let's make sure she never misses a study session! 🔔✨
