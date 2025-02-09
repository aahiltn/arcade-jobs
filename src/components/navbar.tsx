import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/assets/arcade_icon.svg"
            alt="arcade logo"
            width="40"
            height="40"
          />
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium"></nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Plan a Trip
          </Button>
          <Link href="/auth">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
