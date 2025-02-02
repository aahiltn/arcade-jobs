// components/JobBubble.tsx
interface JobBubbleProps {
  jobName: string;
  positionTitle: string;
  date: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  className?: string;
}

const statusColors = {
  APPLIED: 'border-cyan-500/30',
  INTERVIEW: 'border-purple-500/30',
  OFFER: 'border-emerald-500/30',
  REJECTED: 'border-red-500/30',
};

export default function JobCard({ 
  jobName, 
  positionTitle, 
  date, 
  status, 
  className = ''
}: JobBubbleProps) {
  return (
    <div className={`rounded-lg border-4 flex flex-col items-center justify-center 
      bg-black/60 hover:border-cyan-400/50 transition-all duration-300 group relative 
      shadow-lg ${statusColors[status]} ${className}`}
    >
      {/* Status indicator */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-black
        ${status === 'APPLIED' ? 'bg-cyan-500' :
          status === 'INTERVIEW' ? 'bg-purple-500' :
          status === 'OFFER' ? 'bg-emerald-500' :
          'bg-red-500'
        } shadow-glow-sm`} 
      />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Pixel grid overlay */}
      <div className="absolute inset-0 rounded-lg" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(8,145,178,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(8,145,178,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '4px 4px'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center p-4">
        <h2 className="text-lg font-bold text-white truncate mb-1">{jobName}</h2>
        <p className="text-sm text-cyan-300 mb-2">{positionTitle}</p>
        <div className="text-xs font-mono text-purple-300">
          {new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}