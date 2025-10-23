import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export function useStudyLogs() {
  const queryClient = useQueryClient();

  const logsQuery = useQuery({
    queryKey: ["studyLogs"],
    queryFn: async () => {
      console.log("🔍 useStudyLogs: Starting query...");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("🔍 useStudyLogs: User from auth:", user ? "YES" : "NO");

      if (!user) {
        console.error("❌ useStudyLogs: Not authenticated");
        throw new Error("Not authenticated");
      }

      console.log("🔍 useStudyLogs: Fetching logs for user:", user.id);

      const { data, error } = await supabase
        .from("study_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("study_date", { ascending: false });

      if (error) {
        console.error("❌ useStudyLogs: Database error:", error);
        throw error;
      }

      console.log("✅ useStudyLogs: Fetched", data?.length || 0, "logs");
      return data;
    },
    retry: 2,
    staleTime: 30000, // 30 seconds
  });

  const addLogMutation = useMutation({
    mutationFn: async (logData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("study_logs")
        .insert([{ ...logData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyLogs"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      toast.success("Study log added successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add study log");
    },
  });

  const updateLogMutation = useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      console.log("Updating log:", { id, updates, userId: user.id });

      const { data, error } = await supabase
        .from("study_logs")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select();

      console.log("Update result:", { data, error });

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("No matching log found to update");
      }
      return data[0];
    },
    onSuccess: (data) => {
      console.log("Update successful:", data);
      queryClient.invalidateQueries({ queryKey: ["studyLogs"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      toast.success("Study log updated!");
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update study log");
    },
  });

  const deleteLogMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("study_logs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyLogs"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      toast.success("Study log deleted!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete study log");
    },
  });

  return {
    logs: logsQuery.data || [],
    isLoading: logsQuery.isLoading,
    error: logsQuery.error,
    addLog: addLogMutation.mutateAsync,
    updateLog: updateLogMutation.mutateAsync,
    deleteLog: deleteLogMutation.mutateAsync,
  };
}
