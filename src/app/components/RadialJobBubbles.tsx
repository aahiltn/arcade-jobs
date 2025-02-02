// components/RadialJobBubbles.tsx
"use client";
import JobCard from './JobBubble';
import { useEffect, useState } from 'react';

interface RadialJobBubblesProps {
  jobs: Array<{
    jobName: string;
    positionTitle: string;
    date: string;
    status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  }>;
}

function JobBubble({ job, position, isSelected, onSelect }: {
  job: any;
  position: { x: number; y: number };
  isSelected: boolean;
  onSelect: () => void;
}) {
  const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '160px',
    height: '100px',
    transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
  } as const;

  return (
    <div
      style={style}
      className={`transition-all duration-300 hover:scale-110 hover:z-10
        ${isSelected ? 'scale-110 z-10' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <JobCard
        {...job}
        variant="small"
        className="hover:shadow-lg hover:shadow-cyan-500/20 w-full h-full"
      />
    </div>
  );
}

export default function RadialJobBubbles({ jobs }: RadialJobBubblesProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);

  const calculatePositions = (total: number) => {
    const positions = [];
    const RADIUS = 250;
    const SPACING_ANGLE = (2 * Math.PI) / (total - 1);
    
    for (let i = 0; i < total; i++) {
      if (i === 0) {
        positions.push({ x: 0, y: 0 });
        continue;
      }

      const angle = (i - 1) * SPACING_ANGLE - Math.PI / 2;
      positions.push({
        x: Math.cos(angle) * RADIUS,
        y: Math.sin(angle) * RADIUS,
      });
    }
    return positions;
  };

  useEffect(() => {
    setMounted(true);
    setPositions(calculatePositions(jobs.length));
  }, [jobs.length]);

  if (!mounted) return null;

  const sortedJobs = [...jobs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className={`relative w-[800px] h-[600px] transition-transform duration-300 ease-in-out
          ${selectedJob !== null ? '-translate-x-[200px]' : ''}`}
        onClick={() => setSelectedJob(null)}
      >
        {sortedJobs.map((job, index) => {
          const position = positions[index];
          if (!position) return null;

          return (
            <JobBubble
              key={index}
              job={job}
              position={position}
              isSelected={selectedJob === index}
              onSelect={() => setSelectedJob(index)}
            />
          );
        })}
      </div>

      {/* Details panel */}
      <div 
        className={`absolute top-0 right-0 h-full w-[400px] 
          bg-gray-900/95 backdrop-blur-sm
          transition-transform duration-300 ease-in-out transform 
          ${selectedJob !== null ? 'translate-x-0' : 'translate-x-full'}
          border-l border-gray-800 shadow-2xl
          flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedJob !== null && (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-mono text-cyan-300">Job Details</h3>
              <button 
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 
                  flex items-center justify-center text-gray-400 hover:text-white
                  transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <JobCard
                {...sortedJobs[selectedJob]}
                className="hover:transform-none"
              />
              
              {/* Additional details */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-lg bg-black/40 border border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Status History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                      <span className="text-cyan-300">Applied</span>
                      <span className="ml-auto text-gray-500 font-mono">
                        {new Date(sortedJobs[selectedJob].date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-black/40 border border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Actions</h4>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 
                      text-white text-sm font-medium transition-colors duration-200">
                      Update Status
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                      text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}