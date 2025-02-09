import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Level up your career with
          <br />
          <span className="flex items-center justify-center gap-2 mt-3">
            <Image
              src="/assets/ArcadeLogoSimplestLight_Text.svg"
              alt="arcade logo"
              width="500"
              height="40"
            ></Image>
          </span>
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Track all your job applications in one place, automatically. Stay
          organized and focused on your job search without any extra effort.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/auth">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
