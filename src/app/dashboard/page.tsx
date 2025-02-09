"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProgressCalendar } from "../../components/progress-calendar";
import JobCard from "../components/JobCard";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Job, JobDataResponse } from "@/lib/types";

export default function Dashboard() {
  const router = useRouter();
  const { signOut, user } = useClerk();
  const username = user?.username;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [jobData, setJobData] = useState<Job[]>([]);
  const [todaysEmailCount, setTodaysEmailCount] = useState(0);

  useEffect(() => {
    async function fetchEmailData() {
      if (!username) return;

      await fetch("api/clerk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email: userEmail,
          arcade_email: `${username}@me.arcadejobs.co`,
        }),
      }).catch((error) => {
        console.log("oops", error);
      });

      try {
        const response = await fetch(`/api/jobs?userId=${username}`);
        const data: JobDataResponse = await response.json();
        setJobData(data.emails);
        setTodaysEmailCount(data.todaysEmailCount);
      } catch (error) {
        console.error("Error fetching email session data:", error);
      }
    }

    fetchEmailData();
  }, [username, userEmail]);

  const calculateLevel = (jobCount: number) => Math.floor(jobCount / 4) + 1;

  const level = calculateLevel(jobData.length);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold flex-row flex gap-2">
              <Image
                src="/assets/arcade_icon.svg"
                alt="arcade logo"
                width="40"
                height="40"
              />
              {username}&apos;s <span className="text-primary">Arcade</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-primary font-mono">Level {level}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary font-mono">
                {todaysEmailCount} Today
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary font-mono">
                {jobData.length} Total
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => signOut(() => router.push("/"))}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200
                border border-gray-700 hover:border-gray-600"
            >
              Log Out
            </button>
            <UserButton />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-2xl font-bold">
          <div className="bg-primary text-primary-foreground p-4 rounded-lg">
            {username}@me.arcadejobs.co
          </div>
          <ArrowRight className="text-primary" />
          <div className="bg-secondary p-4 rounded-lg">{userEmail}</div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-6 text-center flex flex-col justify-center items-center h-72 shadow-lg mx-auto w-full">
            <h2 className="text-2xl mb-4 text-primary">Application Activity</h2>
            <ProgressCalendar jobData={jobData} />
          </div>

          <div className="space-y-6 max-h-[250px] overflow-y-auto">
            <h2 className="text-2xl text-primary sticky top-0 bg-background py-2">
              Recent Applications
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {jobData.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
