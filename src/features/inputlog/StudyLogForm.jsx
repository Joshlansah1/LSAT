import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { hoursValidation, moodValidation } from "../../utils/validation";
import { useStudyLogs } from "../../hooks/useStudyLogs";

const MOOD_OPTIONS = [
  { value: "excellent", label: "😄 Excellent", emoji: "😄" },
  { value: "good", label: "🙂 Good", emoji: "🙂" },
  { value: "okay", label: "😐 Okay", emoji: "😐" },
  { value: "struggling", label: "😞 Struggling", emoji: "😞" },
];

export function StudyLogForm({ onSuccess, initialData }) {
  const { addLog, updateLog } = useStudyLogs();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      study_date: new Date().toISOString().split("T")[0],
      hours_studied: "",
      mood: "",
      notes: "",
    },
  });

  const selectedMood = watch("mood");

  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      reset({
        study_date: initialData.study_date,
        hours_studied: initialData.hours_studied.toString(),
        mood: initialData.mood,
        notes: initialData.notes || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Form submit:", { data, initialData });

      if (initialData) {
        // Update existing log
        console.log("Updating with:", {
          id: initialData.id,
          hours_studied: parseFloat(data.hours_studied),
          mood: data.mood,
          notes: data.notes || null,
        });

        await updateLog({
          id: initialData.id,
          hours_studied: parseFloat(data.hours_studied),
          mood: data.mood,
          notes: data.notes || null,
        });

        console.log("Update completed");
      } else {
        // Add new log
        await addLog({
          study_date: data.study_date,
          hours_studied: parseFloat(data.hours_studied),
          mood: data.mood,
          notes: data.notes || null,
        });
      }

      // Only reset if creating new (not editing)
      if (!initialData) {
        reset();
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving study log:", error);
      toast.error(error.message || "Failed to save study log");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Date - Read-only, always today */}
        <div>
          <label
            htmlFor="study_date"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Date
          </label>
          <Input
            id="study_date"
            type="date"
            {...register("study_date", { required: "Date is required" })}
            error={errors.study_date?.message}
            disabled
            className="opacity-60 cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">
            You can only log study time for today
          </p>
        </div>

        {/* Hours Studied */}
        <div>
          <label
            htmlFor="hours_studied"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Hours Studied
          </label>
          <Input
            id="hours_studied"
            type="number"
            step="0.5"
            placeholder="e.g., 3.5"
            {...register("hours_studied", hoursValidation)}
            error={errors.hours_studied?.message}
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            How did it go?
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MOOD_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    selectedMood === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("mood", moodValidation)}
                  className="sr-only"
                />
                <span className="text-2xl mb-1">{option.emoji}</span>
                <span className="text-xs font-medium text-foreground">
                  {option.label.split(" ")[1]}
                </span>
              </label>
            ))}
          </div>
          {errors.mood && (
            <p className="text-sm text-destructive mt-1">
              {errors.mood.message}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium mb-1 text-foreground"
          >
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="What did you study? Any insights or challenges?"
            {...register("notes")}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {initialData ? "Updating..." : "Saving..."}
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <FiSave className="mr-2" />
              {initialData ? "Update Study Log" : "Save Study Log"}
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
