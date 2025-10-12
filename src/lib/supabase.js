import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Database helper functions
 */

// Get current user profile
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get study logs for a user
export const getStudyLogs = async (userId, startDate, endDate) => {
  let query = supabase
    .from("study_logs")
    .select("*")
    .eq("user_id", userId)
    .order("study_date", { ascending: false });

  if (startDate) {
    query = query.gte("study_date", startDate);
  }
  if (endDate) {
    query = query.lte("study_date", endDate);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

// Create or update study log
export const upsertStudyLog = async (log) => {
  const { data, error } = await supabase
    .from("study_logs")
    .upsert(log, { onConflict: "user_id,study_date" })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete study log
export const deleteStudyLog = async (logId) => {
  const { error } = await supabase.from("study_logs").delete().eq("id", logId);

  if (error) throw error;
  return true;
};

// Get today's study log
export const getTodayStudyLog = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("study_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("study_date", today)
    .maybeSingle();

  if (error) throw error;
  return data;
};
