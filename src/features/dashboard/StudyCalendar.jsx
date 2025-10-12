import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Card from "../../components/ui/Card";
import { parseISO } from "date-fns";

/**
 * StudyCalendar component
 * Highlights days when user studied
 */
const StudyCalendar = ({ studyLogs }) => {
  // Get all study dates
  const studyDates = useMemo(() => {
    if (!studyLogs || studyLogs.length === 0) return [];

    return studyLogs.map((log) => {
      const date = parseISO(log.study_date);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }, [studyLogs]);

  // Custom modifiers for styling
  const modifiers = {
    studied: studyDates,
  };

  const modifiersStyles = {
    studied: {
      backgroundColor: "#22c55e",
      color: "white",
      fontWeight: "bold",
    },
  };

  const modifiersClassNames = {
    studied:
      "bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600",
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Study Calendar
      </h3>

      <div className="flex justify-center">
        <DayPicker
          mode="multiple"
          selected={studyDates}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          showOutsideDays
          className="rdp-custom"
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-gray-900 dark:text-white",
            nav: "space-x-1 flex items-center",
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-900 dark:text-white",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary-100 dark:[&:has([aria-selected])]:bg-primary-900/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md",
            day_selected:
              "bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-600",
            day_today:
              "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold",
            day_outside: "text-gray-400 dark:text-gray-600 opacity-50",
            day_disabled: "text-gray-400 dark:text-gray-600 opacity-50",
            day_hidden: "invisible",
          }}
        />
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-500" />
          <span className="text-gray-600 dark:text-gray-400">Studied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="text-gray-600 dark:text-gray-400">Today</span>
        </div>
      </div>
    </Card>
  );
};

export default StudyCalendar;
