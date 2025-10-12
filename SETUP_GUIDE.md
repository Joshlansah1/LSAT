# 🚀 Quick Setup Guide for Geraudia's LSAT Journey

This guide will help you get the app up and running in ~15 minutes.

## Step 1: Install Dependencies (2 minutes)

```bash
cd gerdia-lsat
npm install
```

## Step 2: Set Up Supabase (5 minutes)

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in/sign up
2. Click "New Project"
3. Fill in project details:
   - **Name**: geraudia-lsat (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is perfect for this app
4. Click "Create new project" (takes ~2 minutes)

### 2.2 Get Your Supabase Credentials

1. Once project is created, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 2.3 Run the Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` file from this project
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - that's perfect! ✅

### 2.4 Enable Email Authentication

1. Go to **Authentication** → **Providers** (left sidebar)
2. Find "Email" and make sure it's **enabled** (it should be by default)
3. (Optional) Configure email templates under **Authentication** → **Email Templates**

## Step 3: Set Up OneSignal for Notifications (5 minutes)

### 3.1 Create OneSignal Account

1. Go to [onesignal.com](https://onesignal.com) and sign up (free)
2. Click "New App/Website"
3. Enter app name: "Geraudia LSAT Journey"
4. Select **Web Push** platform

### 3.2 Configure Web Push

1. Select **Typical Site** setup
2. Enter your site details:
   - **Site Name**: Geraudia's LSAT Journey
   - **Site URL**: `http://localhost:5173` (for development)
   - For production, use your actual domain
3. Upload an icon (optional, or use default)
4. Click "Save"

### 3.3 Get Your OneSignal App ID

1. Go to **Settings** → **Keys & IDs**
2. Copy your **OneSignal App ID**

### 3.4 Configure Notifications (Optional but Recommended)

1. Go to **Messages** → **Scheduled**
2. Create a new scheduled message:
   - **Title**: "Time to study! 🌸"
   - **Message**: "Keep your streak alive! [streak] days and counting!"
   - **Schedule**: Daily at your preferred study time
   - **Audience**: All Subscribed Users

## Step 4: Configure Environment Variables (1 minute)

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your credentials:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_ONESIGNAL_APP_ID=your-onesignal-app-id-here
   ```

3. Save the file

## Step 5: Run the App! (1 minute)

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173` 🎉

## Step 6: Create Your Account

1. Open `http://localhost:5173` in your browser
2. Click "Sign up"
3. Create your account with:
   - Your name (e.g., "Geraudia")
   - Email address
   - Password (at least 8 characters)
4. Click "Create Account"
5. You'll be automatically logged in and taken to the dashboard!

## Step 7: Log Your First Study Session 📚

1. Click the "Log Today's Study" button
2. Enter hours studied (e.g., 2.5)
3. Select your mood
4. Add notes (optional)
5. Click "Save Study Log"

Congratulations! You've started your LSAT journey! 🌱

---

## 🎯 Next Steps

- **Enable Notifications**: Click "Allow" when prompted for notifications
- **Daily Habit**: Come back every day to maintain your streak!
- **Explore Features**: Check out the calendar, weekly chart, and watch your flower grow
- **Customize**: Edit `tailwind.config.js` to change colors to your preference

---

## ⚠️ Common Issues & Solutions

### "Failed to fetch" error when logging in

- **Solution**: Make sure your Supabase URL and key are correct in `.env`
- **Check**: Restart the dev server after changing `.env` file

### Notifications not appearing

- **Solution**: Make sure you clicked "Allow" when prompted
- **Check**: Notifications require HTTPS in production (localhost is fine for dev)
- **Verify**: Your OneSignal App ID is correct in `.env`

### "Table doesn't exist" errors

- **Solution**: Make sure you ran the entire SQL schema in Supabase SQL Editor
- **Check**: Go to Supabase → Table Editor and verify `profiles` and `study_logs` tables exist

### Calendar or chart not showing data

- **Solution**: Log at least one study session first
- **Wait**: It may take a few seconds for data to sync

### Dark mode not working

- **Solution**: Click the sun/moon icon in the top right of the dashboard
- **Note**: Theme preference is saved in browser localStorage

---

## 📱 For Production Deployment

When ready to deploy:

1. **Update OneSignal Settings**:

   - Add your production domain URL
   - Update HTTPS settings

2. **Update Environment Variables**:

   - Use your production URL in Vercel/Netlify settings
   - Never commit `.env` file to git!

3. **Enable HTTPS**:

   - Required for push notifications
   - Vercel and Netlify provide this automatically

4. **Configure Email Templates**:
   - Customize Supabase email templates
   - Set up custom domain for emails (optional)

---

## 🆘 Need Help?

- Check the main `README.md` for detailed documentation
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Review OneSignal docs: [documentation.onesignal.com](https://documentation.onesignal.com)

---

**You're all set! Happy studying! 📚✨**
