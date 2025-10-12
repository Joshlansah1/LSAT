# 🗄️ Supabase Database Setup Guide

This guide will walk you through setting up your Supabase database for Geraudia's LSAT Journey app.

---

## 📋 Prerequisites

- ✅ Supabase project created
- ✅ `.env` file configured with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## 🚀 Step-by-Step Setup

### Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **rwzjyzzwqoxcgrurmcyv**
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Setup SQL

1. Open the file: `supabase-setup.sql` (in your project root)
2. Copy the **entire contents** of that file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)
5. Wait for the success message: ✅ "Success. No rows returned"

### Step 3: Verify Tables Created

1. Click **Table Editor** in the left sidebar
2. You should see 2 tables:
   - **profiles** - User profile information
   - **study_logs** - Daily study log entries

### Step 4: Check Row Level Security (RLS) Policies

1. Click **Authentication** in the left sidebar
2. Click **Policies**
3. You should see policies for:
   - **profiles** (3 policies: view, insert, update)
   - **study_logs** (4 policies: view, insert, update, delete)

---

## 📊 Database Schema

### `profiles` Table

Stores additional user information linked to Supabase auth.

| Column       | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `id`         | UUID      | Primary key                        |
| `user_id`    | UUID      | Foreign key to auth.users (unique) |
| `full_name`  | TEXT      | User's full name                   |
| `avatar_url` | TEXT      | Profile picture URL                |
| `created_at` | TIMESTAMP | When profile was created           |
| `updated_at` | TIMESTAMP | Last update timestamp              |

### `study_logs` Table

Stores daily study sessions.

| Column          | Type         | Description                             |
| --------------- | ------------ | --------------------------------------- |
| `id`            | UUID         | Primary key                             |
| `user_id`       | UUID         | Foreign key to auth.users               |
| `study_date`    | DATE         | Date of study session                   |
| `hours_studied` | NUMERIC(4,2) | Hours studied (0-24)                    |
| `mood`          | TEXT         | Mood: excellent, good, okay, struggling |
| `notes`         | TEXT         | Optional study notes                    |
| `created_at`    | TIMESTAMP    | When log was created                    |
| `updated_at`    | TIMESTAMP    | Last update timestamp                   |

**Unique constraint:** One log per user per date (`user_id`, `study_date`)

---

## 🔒 Row Level Security (RLS) Policies

All tables have RLS **enabled** for security. Users can only access their own data.

### Profiles Policies

- ✅ **View own profile**: Users can read their profile
- ✅ **Insert own profile**: Users can create their profile (auto-created on signup)
- ✅ **Update own profile**: Users can update their profile

### Study Logs Policies

- ✅ **View own logs**: Users can read their study logs
- ✅ **Insert own logs**: Users can create study logs
- ✅ **Update own logs**: Users can edit their study logs
- ✅ **Delete own logs**: Users can delete their study logs

---

## 🎯 Auto-Triggers Setup

The SQL script sets up automatic triggers:

1. **Auto-update `updated_at`**: Automatically updates the `updated_at` timestamp on any UPDATE
2. **Auto-create profile**: Automatically creates a profile when a user signs up

---

## 🧪 Testing Your Setup

### Option 1: Use the App

1. Run your app: `npm run dev`
2. Sign up for a new account
3. Log in and create a study log
4. Check Supabase Table Editor to see your data

### Option 2: Add Sample Data

1. Go to Supabase SQL Editor
2. Run this query (replace `YOUR_USER_ID` with your actual user ID):

```sql
-- First, get your user ID
SELECT id, email FROM auth.users;

-- Then insert sample data (replace YOUR_USER_ID)
INSERT INTO study_logs (user_id, study_date, hours_studied, mood, notes) VALUES
  ('YOUR_USER_ID', '2025-10-08', 3.5, 'good', 'Worked on logical reasoning'),
  ('YOUR_USER_ID', '2025-10-09', 4.0, 'excellent', 'Great progress on reading comprehension'),
  ('YOUR_USER_ID', '2025-10-10', 2.5, 'okay', 'Struggled with analytical reasoning'),
  ('YOUR_USER_ID', '2025-10-11', 5.0, 'excellent', 'Full practice test completed'),
  ('YOUR_USER_ID', '2025-10-12', 3.0, 'good', 'Reviewed mistakes from practice test');
```

---

## 🔍 Useful SQL Queries

### Get all your study logs

```sql
SELECT * FROM study_logs
WHERE user_id = auth.uid()
ORDER BY study_date DESC;
```

### Get your study stats

```sql
SELECT
  COUNT(*) as total_days,
  SUM(hours_studied) as total_hours,
  AVG(hours_studied) as avg_hours
FROM study_logs
WHERE user_id = auth.uid();
```

### Get logs for the last 7 days

```sql
SELECT * FROM study_logs
WHERE user_id = auth.uid()
  AND study_date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY study_date DESC;
```

---

## 🛠️ Troubleshooting

### Problem: "Success. No rows returned" but tables not showing

**Solution:** Refresh the Table Editor page or check the "Schema" dropdown (should be "public")

### Problem: RLS policies not showing

**Solution:**

1. Go to Authentication > Policies
2. Make sure you're looking at the "public" schema
3. Refresh the page

### Problem: Can't insert data as a user

**Solution:**

1. Make sure you're logged in (check `auth.uid()`)
2. Verify RLS policies are enabled and correct
3. Check the browser console for error messages

### Problem: Profile not auto-created on signup

**Solution:**

1. Verify the trigger exists: `on_auth_user_created`
2. Check Function Editor for `handle_new_user()`
3. Try signing up with a new test account

---

## 📱 Enable Email Authentication

To allow users to sign up with email:

1. Go to **Authentication** > **Providers**
2. Make sure **Email** is enabled
3. Configure email settings (optional):
   - Enable **Confirm email**
   - Set **Redirect URLs** if needed

---

## 🎨 Optional: Enable Social Login

To add Google/GitHub login:

1. Go to **Authentication** > **Providers**
2. Enable **Google** or **GitHub**
3. Follow the setup instructions
4. Add the OAuth credentials

---

## ✅ Setup Checklist

- [ ] Ran `supabase-setup.sql` in SQL Editor
- [ ] Verified `profiles` table exists
- [ ] Verified `study_logs` table exists
- [ ] Checked RLS policies are enabled
- [ ] Tested signup and profile creation
- [ ] Created a test study log
- [ ] Verified data shows in Table Editor

---

## 🚀 You're All Set!

Your Supabase database is now configured and ready to use. Start the app and begin tracking your LSAT journey!

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
