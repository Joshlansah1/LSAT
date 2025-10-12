import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { parseISO, format, isSameDay, isToday } from "date-fns";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useStudyLogs } from "../../hooks/useStudyLogs";

/**
 * StudyCalendar component
 * Interactive calendar that highlights days when you studied
 * - Green = Days you logged study sessions
 * - Click a study day to see details
 * - Edit/Delete today's log only (prevents backdating)
 */
const StudyCalendar = ({ logs = [], onEditToday }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { deleteLog } = useStudyLogs();

  // Get all study dates
  const studyDates = useMemo(() => {
    if (!logs || logs.length === 0) return [];

    return logs.map((log) => {
      const date = parseISO(log.study_date);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }, [logs]);

  // Find log for selected date
  const selectedLog = useMemo(() => {
    if (!selectedDate || !logs) return null;

    return logs.find((log) => {
      const logDate = parseISO(log.study_date);
      return isSameDay(logDate, selectedDate);
    });
  }, [selectedDate, logs]);

  // Handle day click
  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDate(day);
  };

  // Handle delete
  const handleDelete = async () => {
    if (
      !selectedLog ||
      !window.confirm("Are you sure you want to delete this study log?")
    )
      return;

    try {
      await deleteLog(selectedLog.id);
      setSelectedDate(null);
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  // Check if selected date is today
  const isSelectedToday = selectedDate && isToday(selectedDate);

  // Custom modifiers for styling
  const modifiers = {
    studied: studyDates,
  };

  const modifiersClassNames = {
    studied: "!bg-green-500 !text-white font-bold hover:!bg-green-600",
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Study Calendar
        </h3>
        <p className="text-xs text-muted-foreground">
          🟢 = Study days • Click a day to see details
        </p>
      </div>

      <div className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          showOutsideDays
          className="rdp-custom"
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-foreground",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal hover:bg-accent rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            day_selected:
              "!bg-primary/20 !text-foreground font-semibold ring-2 ring-primary",
            day_today: "border-2 border-primary text-foreground font-bold",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
            day_hidden: "invisible",
          }}
        />
      </div>

      {/* Selected Day Info */}
      {selectedLog && (
        <div className="mt-4 p-4 bg-accent rounded-lg border border-border">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-foreground">
              📅 {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h4>
            {isSelectedToday && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditToday(selectedLog)}
                  className="!p-2"
                >
                  <FiEdit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={handleDelete}
                  className="!p-2"
                >
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Hours studied:</span>
              <span className="font-semibold text-foreground">
                {parseFloat(selectedLog.hours_studied).toFixed(1)}h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mood:</span>
              <span className="font-semibold text-foreground capitalize">
                {selectedLog.mood === "excellent" && "😄 Excellent"}
                {selectedLog.mood === "good" && "🙂 Good"}
                {selectedLog.mood === "okay" && "😐 Okay"}
                {selectedLog.mood === "struggling" && "😞 Struggling"}
              </span>
            </div>
            {selectedLog.notes && (
              <div>
                <span className="text-muted-foreground block mb-1">Notes:</span>
                <p className="text-foreground bg-background p-2 rounded border border-border text-xs">
                  {selectedLog.notes}
                </p>
              </div>
            )}
          </div>
          {isSelectedToday && (
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
              💡 You can only edit or delete today's log
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Study Days</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-primary bg-accent" />
          <span className="text-muted-foreground">Today</span>
        </div>
      </div>
    </Card>
  );
};

export { StudyCalendar };
export default StudyCalendar;
