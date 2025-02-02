"use client";
import { ProgressCalendar } from "../components/ProgressCalendar";
import JobCard from "../components/JobBubble";
import RadialJobBubbles from "../components/RadialJobBubbles";
import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  // This is mock data - you'll want to fetch this from your database in a real implementation
  const mockJobs: Array<{
    jobName: string;
    positionTitle: string;
    date: string;
    status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  }> = [
    {
      jobName: "Tech Corp",
      positionTitle: "Senior Developer",
      date: "2024-03-20",
      status: "APPLIED"
    },
    {
      jobName: "Startup Inc",
      positionTitle: "Full Stack Engineer",
      date: "2024-03-18",
      status: "INTERVIEW"
    },
    {
      jobName: "Big Tech Co",
      positionTitle: "Software Engineer",
      date: "2024-03-15",
      status: "OFFER"
    },
    {
      jobName: "AI Labs",
      positionTitle: "ML Engineer",
      date: "2024-03-14",
      status: "INTERVIEW"
    },
    {
      jobName: "Cyber Sec",
      positionTitle: "Security Engineer",
      date: "2024-03-12",
      status: "REJECTED"
    },
    {
      jobName: "Data Co",
      positionTitle: "Data Scientist",
      date: "2024-03-10",
      status: "APPLIED"
    },
    {
      jobName: "Game Studio",
      positionTitle: "Game Developer",
      date: "2024-03-08",
      status: "INTERVIEW"
    },
    {
      jobName: "Cloud Corp",
      positionTitle: "DevOps Engineer",
      date: "2024-03-05",
      status: "APPLIED"
    },
    {
      jobName: "Mobile Inc",
      positionTitle: "Mobile Developer",
      date: "2024-03-03",
      status: "OFFER"
    },
    {
      jobName: "Web Tech",
      positionTitle: "Frontend Engineer",
      date: "2024-03-01",
      status: "INTERVIEW"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Your Progress
            </span>
          </h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Progress Calendar Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl mb-4 text-cyan-300 text-center">Activity Calendar</h2>
          <div className="flex justify-center">
            <ProgressCalendar />
          </div>
        </div>

        {/* Radial Bubbles Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 relative overflow-hidden">
          {/* Scanline and CRT effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(8,145,178,0.05)_50%,transparent_100%)] animate-glow" />
            {/* Pixel grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(8,145,178,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(8,145,178,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '2px 2px'
            }} />
            {/* Screen edge glow */}
            <div className="absolute inset-0 rounded-xl border border-cyan-500/20 shadow-[inset_0_0_30px_rgba(8,145,178,0.2)]" />
          </div>

          <div className="relative">
            <h2 className="text-2xl mb-4 text-cyan-300 text-center font-mono tracking-wider">
              Active Applications
            </h2>
            <div className="flex justify-center">
              <RadialJobBubbles jobs={mockJobs} />
            </div>
          </div>
        </div>

        {/* Job Applications Section */}
        <div className="space-y-6">
          <h2 className="text-2xl text-cyan-300">Recent Applications</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="overflow-x-auto scrollbar-hide">
              <div className="grid grid-rows-2 gap-4 p-2">
                <div className="flex gap-4 min-w-min">
                  {mockJobs.slice(0, Math.ceil(mockJobs.length / 2)).map((job, index) => (
                    <div key={index} className="w-[300px] flex-shrink-0">
                      <JobCard {...job} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 min-w-min">
                  {mockJobs.slice(Math.ceil(mockJobs.length / 2)).map((job, index) => (
                    <div key={index} className="w-[300px] flex-shrink-0">
                      <JobCard {...job} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 