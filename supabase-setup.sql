-- ============================================
-- GERAUDIA'S LSAT JOURNEY - SUPABASE DATABASE SETUP
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- This will create all tables and Row Level Security policies
-- ============================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
-- Stores additional user profile information
-- Linked to Supabase auth.users via user_id

CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ============================================
-- 2. STUDY_LOGS TABLE
-- ============================================
-- Stores daily study log entries

CREATE TABLE IF NOT EXISTS study_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_date DATE NOT NULL,
  hours_studied NUMERIC(4,2) NOT NULL CHECK (hours_studied >= 0 AND hours_studied <= 24),
  mood TEXT NOT NULL CHECK (mood IN ('excellent', 'good', 'okay', 'struggling')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one log per user per date
  UNIQUE(user_id, study_date)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_study_logs_user_date 
  ON study_logs(user_id, study_date DESC);

-- Enable RLS on study_logs
ALTER TABLE study_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for study_logs
-- Users can view their own study logs
CREATE POLICY "Users can view own study logs"
  ON study_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own study logs
CREATE POLICY "Users can insert own study logs"
  ON study_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own study logs
CREATE POLICY "Users can update own study logs"
  ON study_logs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own study logs
CREATE POLICY "Users can delete own study logs"
  ON study_logs
  FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- 3. TRIGGER TO AUTO-UPDATE updated_at
-- ============================================
-- This trigger automatically updates the updated_at timestamp

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to study_logs table
DROP TRIGGER IF EXISTS update_study_logs_updated_at ON study_logs;
CREATE TRIGGER update_study_logs_updated_at
  BEFORE UPDATE ON study_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- 4. FUNCTION TO AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
-- This function automatically creates a profile when a user signs up

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ============================================
-- 5. HELPFUL VIEWS (Optional but useful)
-- ============================================

-- View to get user study stats
CREATE OR REPLACE VIEW user_study_stats AS
SELECT 
  user_id,
  COUNT(*) AS total_days_logged,
  SUM(hours_studied) AS total_hours,
  AVG(hours_studied) AS avg_hours_per_day,
  MAX(study_date) AS last_study_date,
  MIN(study_date) AS first_study_date
FROM study_logs
GROUP BY user_id;

-- Grant access to authenticated users
GRANT SELECT ON user_study_stats TO authenticated;


-- ============================================
-- 6. SAMPLE DATA (Optional - for testing)
-- ============================================
-- Uncomment below to insert sample data for testing
-- NOTE: Replace 'YOUR_USER_ID' with your actual user ID from auth.users

/*
-- Insert sample study logs (replace YOUR_USER_ID)
INSERT INTO study_logs (user_id, study_date, hours_studied, mood, notes) VALUES
  ('YOUR_USER_ID', '2025-10-01', 3.5, 'good', 'Worked on logical reasoning'),
  ('YOUR_USER_ID', '2025-10-02', 4.0, 'excellent', 'Great progress on reading comprehension'),
  ('YOUR_USER_ID', '2025-10-03', 2.5, 'okay', 'Struggled with analytical reasoning'),
  ('YOUR_USER_ID', '2025-10-04', 5.0, 'excellent', 'Full practice test completed'),
  ('YOUR_USER_ID', '2025-10-05', 3.0, 'good', 'Reviewed mistakes from practice test');
*/


-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Go to your Supabase project: https://supabase.com/dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute all commands
-- 6. Verify tables were created in "Table Editor"
-- 7. Check RLS policies in Authentication > Policies
-- ============================================
