import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "../../components/ui/Card";
import {
  format,
  startOfWeek,
  addDays,
  parseISO,
  isWithinInterval,
} from "date-fns";

/**
 * WeeklyProgressChart component
 * Displays a bar chart of study hours for the current week
 */
const WeeklyProgressChart = ({ logs = [] }) => {
  // Prepare chart data
  const chartData = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Create data for each day of the week
    const data = daysOfWeek.map((day, index) => {
      const date = addDays(weekStart, index);
      const dateStr = format(date, "yyyy-MM-dd");

      // Find log for this date
      const log = logs?.find((l) => l.study_date === dateStr);

      return {
        day,
        hours: log ? parseFloat(log.hours_studied) : 0,
        date: dateStr,
        isToday: format(new Date(), "yyyy-MM-dd") === dateStr,
      };
    });

    return data;
  }, [logs]);

  // Calculate total and average
  const stats = useMemo(() => {
    const total = chartData.reduce((sum, day) => sum + day.hours, 0);
    const daysStudied = chartData.filter((day) => day.hours > 0).length;
    const average = daysStudied > 0 ? total / daysStudied : 0;

    return { total, average, daysStudied };
  }, [chartData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium text-foreground">
            {payload[0].payload.day}
          </p>
          <p className="text-sm text-primary">{payload[0].value} hours</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          This Week's Progress
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {stats.total.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Total Hours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {stats.daysStudied}
            </p>
            <p className="text-xs text-muted-foreground">Days Studied</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.average.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Avg Hours/Day</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted"
            opacity={0.2}
          />
          <XAxis
            dataKey="day"
            className="stroke-muted-foreground"
            fontSize={12}
          />
          <YAxis
            className="stroke-muted-foreground"
            fontSize={12}
            label={{
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              className: "fill-muted-foreground",
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
          />
          <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isToday ? "hsl(var(--primary))" : "#22c55e"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span className="text-muted-foreground">Study Days</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: "hsl(var(--primary))" }}
          />
          <span className="text-muted-foreground">Today</span>
        </div>
      </div>
    </Card>
  );
};

export { WeeklyProgressChart };
export default WeeklyProgressChart;
