"use client";
import { ProgressCalendar } from "../components/ProgressCalendar";
import JobCard from "../components/JobBubble";
import RadialJobBubbles from "../components/RadialJobBubbles";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useClerk } from "@clerk/nextjs";

export default function Dashboard() {
  const router = useRouter();
  const { signOut } = useClerk();

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

  // Calculate level and progress
  const calculateLevel = (jobCount: number) => {
    return Math.floor(jobCount / 4) + 1;
  };

  const calculateProgress = (jobCount: number) => {
    const nextLevelApps = calculateLevel(jobCount) * 4;
    const prevLevelApps = nextLevelApps - 4;
    return ((jobCount - prevLevelApps) / 4) * 100;
  };

  const level = calculateLevel(mockJobs.length);
  const progress = calculateProgress(mockJobs.length);

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      {/* Decorative pixel squares */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large squares */}
        <div className="absolute top-20 left-[10%] w-8 h-8 bg-purple-500/20 animate-pulse" />
        <div className="absolute bottom-20 right-[10%] w-8 h-8 bg-cyan-500/20 animate-pulse delay-100" />
        
        {/* Medium squares */}
        <div className="absolute top-1/4 right-[15%] w-6 h-6 bg-pink-500/20 animate-pulse delay-200" />
        <div className="absolute bottom-1/4 left-[15%] w-6 h-6 bg-purple-400/20 animate-pulse delay-300" />
        <div className="absolute top-2/3 left-[20%] w-6 h-6 bg-cyan-400/20 animate-pulse delay-150" />
        <div className="absolute bottom-2/3 right-[20%] w-6 h-6 bg-pink-400/20 animate-pulse delay-250" />
        
        {/* Small squares */}
        <div className="absolute top-1/3 left-[5%] w-4 h-4 bg-purple-300/20 animate-pulse delay-300" />
        <div className="absolute bottom-1/3 right-[5%] w-4 h-4 bg-cyan-300/20 animate-pulse delay-500" />
        <div className="absolute top-1/2 right-[25%] w-4 h-4 bg-pink-300/20 animate-pulse delay-400" />
        <div className="absolute bottom-1/2 left-[25%] w-4 h-4 bg-cyan-400/20 animate-pulse delay-200" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Your Progress
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-400 font-mono">Level {level}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">
                {mockJobs.length} applications
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => signOut(() => router.push('/'))}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200
                border border-gray-700 hover:border-gray-600"
            >
              Log Out
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mt-4">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 
            animate-pulse opacity-30" />
          
          {/* Progress fill */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 
              transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(16,185,129,0.2)_50%,transparent_100%)] 
              animate-scan" />
          </div>

          {/* Pixel grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16,185,129,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16,185,129,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '4px 4px'
          }} />
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