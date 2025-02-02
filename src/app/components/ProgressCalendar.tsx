import { ContributionCalendar } from 'react-contribution-calendar'

export const ProgressCalendar = () => {
  const data = [
    { '2024-03-01': { level: 1 } },
    { '2024-03-05': { level: 2 } },
    { '2024-03-10': { level: 3 } },
    { '2024-03-15': { level: 4 } },
    { '2024-03-18': { level: 2 } },
    { '2024-03-20': { level: 3 } },
  ];

  return (
    <ContributionCalendar
      data={data}
      dateOptions={{
        start: '2024-01-01',
        end: '2024-12-31',
        daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startsOnSunday: true,
        includeBoundary: true,
      }}
      styleOptions={{
        theme: {
          level0: '#1f2937', // dark gray
          level1: '#0891b2', // cyan-600
          level2: '#6366f1', // indigo-500
          level3: '#a855f7', // purple-500
          level4: '#ec4899', // pink-500
        },
        cx: 20,
        cy: 20,
        cr: 8,
        textColor: '#ffffff' // Added white text color
      }}
      visibilityOptions={{
        hideDescription: true,
        hideMonthLabels: false,
        hideDayLabels: true,
      }}
      onCellClick={(e, data) => console.log(data)}
      scroll={false}
    />
  )
}