import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {/* Main Title with neon effect */}
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Welcome to
        </span>
        <br />
        <span className="text-neon-pink">
          ArcadeJobs!
        </span>
      </h1>

      {/* Subtitle with cyberpunk style */}
      <p className="text-xl md:text-2xl text-cyan-300 mt-4 text-center">
        Gamify your job search
      </p>

      <SignedOut>
        <div className="mt-12 flex gap-4">
          <SignInButton mode="modal">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-neon transition-all duration-300 text-lg">
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-neon transition-all duration-300 text-lg">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Redirect signed-in users to dashboard */}
        {redirect('/dashboard')}
      </SignedIn>

      {/* Pixel art decorations */}
      <div className="absolute bottom-10 left-10 w-8 h-8 bg-purple-500 animate-pulse" />
      <div className="absolute top-10 right-10 w-8 h-8 bg-cyan-500 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-6 h-6 bg-pink-500 animate-pulse delay-75" />
      <div className="absolute top-20 left-20 w-6 h-6 bg-purple-400 animate-pulse delay-100" />
      <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-cyan-400 animate-pulse delay-150" />
      <div className="absolute top-40 right-1/4 w-4 h-4 bg-pink-400 animate-pulse delay-200" />
      <div className="absolute top-1/3 left-10 w-5 h-5 bg-purple-300 animate-pulse delay-300" />
      <div className="absolute bottom-1/3 right-10 w-5 h-5 bg-cyan-300 animate-pulse delay-500" />
    </div>
  );
}
