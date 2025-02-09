import { Job } from "@/lib/types";
import { TimeRange } from "@nivo/calendar";

export function ProgressCalendar({ jobData }: { jobData: Job[] }) {
  // Get last 14 days in local time (including today)
  const days = [...Array(16)].map((_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0); // Reset time to start of day
    d.setDate(d.getDate() - (14 - i)); // Change from - i to - (13 - i) to include today
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD format
  });

  // Prepare calendar data
  const calendarData = jobData.reduce((acc, job) => {
    if (job.timestamp) {
      const date = new Date(job.timestamp);
      date.setHours(0, 0, 0, 0);
      const day = date.toLocaleDateString("en-CA");
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const formattedCalendarData = days.map((day) => ({
    day,
    value: calendarData[day] || 0,
  }));

  return (
    <TimeRange
      data={formattedCalendarData}
      width={400}
      height={100}
      margin={{ left: 85 }}
      direction="vertical"
      minValue={0}
      emptyColor="#eeeeee"
      colors={["#a5d6a7", "#66bb6a", "#43a047", "#2e7d32"]}
      daySpacing={3.5}
      align="right"
      dayBorderColor="transparent"
      dayRadius={10}
      theme={{
        background: "transparent",
        text: {
          fill: "transparent",
          fontSize: 1,
        },
        tooltip: {
          container: {
            background: "#ffffff",
            color: "#2e7d32",
            fontSize: "12px",
            borderRadius: "6px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          },
        },
      }}
      monthLegendOffset={1}
      weekdayLegendOffset={1}
    />
  );
}
