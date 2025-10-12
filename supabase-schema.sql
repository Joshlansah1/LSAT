-- =============================================
-- Geraudia's LSAT Journey - Database Schema
-- =============================================
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Create profiles table
-- Stores user profile information and preferences
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  study_goal INTEGER DEFAULT 3, -- Default daily study goal in hours
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create study_logs table
-- Stores daily study sessions with hours, mood, and notes
CREATE TABLE IF NOT EXISTS study_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_date DATE NOT NULL,
  hours_studied DECIMAL(4,2) NOT NULL CHECK (hours_studied >= 0 AND hours_studied <= 24),
  mood TEXT CHECK (mood IN ('great', 'good', 'neutral', 'tired', 'frustrated')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, study_date) -- One log per user per day
);

-- =============================================
-- Enable Row Level Security (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Profiles Policies
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- =============================================
-- Study Logs Policies
-- =============================================

-- Users can view their own study logs
CREATE POLICY "Users can view own logs" 
  ON study_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own study logs
CREATE POLICY "Users can insert own logs" 
  ON study_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own study logs
CREATE POLICY "Users can update own logs" 
  ON study_logs FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own study logs
CREATE POLICY "Users can delete own logs" 
  ON study_logs FOR DELETE 
  USING (auth.uid() = user_id);

-- =============================================
-- Indexes for Performance
-- =============================================

-- Index on user_id for faster queries
CREATE INDEX IF NOT EXISTS study_logs_user_id_idx 
  ON study_logs(user_id);

-- Index on study_date for date range queries
CREATE INDEX IF NOT EXISTS study_logs_study_date_idx 
  ON study_logs(study_date);

-- Composite index for user-specific date queries
CREATE INDEX IF NOT EXISTS study_logs_user_date_idx 
  ON study_logs(user_id, study_date DESC);

-- =============================================
-- Triggers for Automatic Timestamp Updates
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for study_logs table
DROP TRIGGER IF EXISTS update_study_logs_updated_at ON study_logs;
CREATE TRIGGER update_study_logs_updated_at 
  BEFORE UPDATE ON study_logs
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Helpful Views (Optional)
-- =============================================

-- View for user statistics
CREATE OR REPLACE VIEW user_study_stats AS
SELECT 
  user_id,
  COUNT(*) as total_study_days,
  SUM(hours_studied) as total_hours,
  AVG(hours_studied) as average_hours_per_day,
  MAX(study_date) as last_study_date,
  MIN(study_date) as first_study_date
FROM study_logs
GROUP BY user_id;

-- Grant access to the view
GRANT SELECT ON user_study_stats TO authenticated;

-- =============================================
-- Functions for Business Logic (Optional)
-- =============================================

-- Function to calculate current streak for a user
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_streak INTEGER := 0;
  v_current_date DATE := CURRENT_DATE;
  v_check_date DATE;
BEGIN
  -- Check if user studied today or yesterday
  IF NOT EXISTS (
    SELECT 1 FROM study_logs 
    WHERE user_id = p_user_id 
    AND study_date IN (CURRENT_DATE, CURRENT_DATE - 1)
  ) THEN
    RETURN 0;
  END IF;

  -- Start from today if logged, otherwise yesterday
  IF EXISTS (
    SELECT 1 FROM study_logs 
    WHERE user_id = p_user_id AND study_date = CURRENT_DATE
  ) THEN
    v_check_date := CURRENT_DATE;
  ELSE
    v_check_date := CURRENT_DATE - 1;
  END IF;

  -- Count consecutive days
  WHILE EXISTS (
    SELECT 1 FROM study_logs 
    WHERE user_id = p_user_id AND study_date = v_check_date
  ) LOOP
    v_streak := v_streak + 1;
    v_check_date := v_check_date - 1;
  END LOOP;

  RETURN v_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION calculate_streak(UUID) TO authenticated;

-- =============================================
-- Sample Data (Optional - for testing)
-- =============================================

-- Uncomment to insert sample motivational achievement badges (future feature)
/*
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  requirement_type TEXT, -- 'streak', 'total_hours', 'total_days'
  requirement_value INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO achievements (name, description, icon, requirement_type, requirement_value) VALUES
  ('First Step', 'Complete your first study session', '🌱', 'total_days', 1),
  ('Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', 7),
  ('Month Master', 'Maintain a 30-day streak', '🏆', 'streak', 30),
  ('Century Club', 'Study for 100 total hours', '💯', 'total_hours', 100),
  ('Dedicated Student', 'Study for 50 days', '📚', 'total_days', 50);
*/

-- =============================================
-- Cleanup Commands (Use with caution!)
-- =============================================

-- Uncomment to drop all tables (WARNING: deletes all data!)
/*
DROP VIEW IF EXISTS user_study_stats;
DROP FUNCTION IF EXISTS calculate_streak(UUID);
DROP TABLE IF EXISTS study_logs CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
*/
