# 🚀 Quick Start: Enable OneSignal Notifications NOW

## Follow these steps to get push notifications working in the next 10 minutes!

---

## ✅ Step 1: Create OneSignal Account (3 minutes)

1. **Go to [onesignal.com](https://onesignal.com)**
2. Click **"Get Started Free"** (top right)
3. Sign up with your email
4. Verify your email

---

## ✅ Step 2: Create Your App (2 minutes)

1. Click **"New App/Website"**
2. **Name**: `Geraudia LSAT Journey`
3. Click **"Create"** or **"Next"**
4. Select **"Web"** as the platform
5. Click **"Next"**

---

## ✅ Step 3: Configure Web Push (3 minutes)

### Quick Setup Option (Recommended):

1. Select **"Typical Site"** setup
2. Fill in:
   - **Site Name**: `Geraudia's LSAT Journey`
   - **Site URL**: `http://localhost:5173`
   - **Icon URL**: Leave default or upload a 256x256 icon
3. **Enable Safari Web Push**: Toggle ON (this is for iPhone!)
4. Click **"Save"** or **"Done"**

---

## ✅ Step 4: Get Your App ID (1 minute)

1. Go to **Settings** (gear icon on left sidebar)
2. Click **"Keys & IDs"**
3. **Copy your OneSignal App ID** (looks like: `12345678-abcd-1234-abcd-123456789abc`)

---

## ✅ Step 5: Add to Your .env File (1 minute)

1. **Open** `.env` file in your project
2. **Find** this line:
   ```
   VITE_ONESIGNAL_APP_ID=
   ```
3. **Paste** your App ID:
   ```
   VITE_ONESIGNAL_APP_ID=12345678-abcd-1234-abcd-123456789abc
   ```
4. **Save** the file

---

## ✅ Step 6: Restart Dev Server

**In your terminal:**

1. Press `Ctrl+C` to stop the server
2. Run:
   ```bash
   npm run dev
   ```

---

## ✅ Step 7: Test It!

1. **Open** `http://localhost:5173` in your browser
2. **You should see** a notification permission prompt:
   - Title: "Welcome to Geraudia's LSAT Journey!"
   - Message: "You'll receive daily reminders to keep your streak alive! 🌸"
3. **Click "Allow"** to enable notifications

**If you don't see the prompt:**

- Make sure you restarted the dev server
- Check browser console for any errors (F12)
- Verify the App ID is correct in `.env`

---

## ✅ Step 8: Send a Test Notification (2 minutes)

Back in OneSignal dashboard:

1. Go to **"Messages"** → **"New Push"**
2. Fill in:
   - **Title**: `Test Notification 🎉`
   - **Message**: `If you see this, push notifications are working!`
3. **Send to**: `Test Users` or `All Subscribed Users`
4. Click **"Send Message"**

**You should see the notification pop up!** 🎊

---

## 🎯 What's Enabled Now:

✅ **Welcome notification** when user allows notifications
✅ **User tagging** with:

- `user_name`: "Geraudia"
- `current_streak`: Her current streak count
- `last_study_date`: Last study date
- `total_hours`: Total hours studied
- `streak_level`: beginner/consistent/master
- `has_logged_today`: true/false

✅ **Ready for automated messages** (we'll set these up next!)

---

## 📱 Next: Set Up Automated Daily Reminders

Now that it's working, let's create the automated 5pm daily reminder:

### In OneSignal Dashboard:

1. Go to **"Messages"** → **"Automated"**
2. Click **"New Automated Message"**
3. Select **"Time-based"**
4. Configure:

**Message Details:**

- **Name**: `Daily 5pm Study Reminder`
- **Title**: `Time to study! 🌸`
- **Message**: `Your LSAT flower is waiting for today's sunshine! Let's keep that streak growing! 🌻`
- **Launch URL**: `http://localhost:5173` (change to production URL later)

**Schedule:**

- **Delivery**: `Every day at a specific time`
- **Time**: `5:00 PM`
- **Timezone**: `(GMT+0:00) Africa/Accra`

**Audience:**

- **Send to**: `All Subscribed Users`

5. **Save & Enable**

---

## 🎊 You're Done!

Your app now has:

- ✅ OneSignal enabled
- ✅ Welcome notification
- ✅ User tagging for personalization
- ✅ Ready for iPhone (iOS 16.4+)
- ✅ Daily 5pm Ghana time reminder set up

---

## 📱 For Geraudia's iPhone:

**When deployed to production (Vercel/Netlify):**

1. **Open in Safari** (not Chrome!)
2. **Add to Home Screen**:
   - Tap Share button
   - Select "Add to Home Screen"
3. **Allow notifications** when prompted
4. She'll receive:
   - Welcome message immediately
   - Daily reminder at 5pm Ghana time
   - Works even when app is closed! 🎉

---

## 🔧 Troubleshooting:

**"No prompt showing"**
→ Check `.env` has correct App ID
→ Restart dev server
→ Clear browser cache

**"Notifications not working"**
→ Make sure you clicked "Allow"
→ Check browser notification settings
→ Verify you sent to "All Subscribed Users"

**"Can't find App ID"**
→ OneSignal → Settings → Keys & IDs

---

## 📚 Full Documentation:

For detailed setup, advanced features, and production deployment:
→ See `ONESIGNAL_SETUP.md`

---

**Need help?** Check the console for errors or see the full documentation!

**Ready to test?** Follow the steps above and you'll have notifications working in 10 minutes! 🚀
