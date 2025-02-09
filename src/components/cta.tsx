import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section className="border-t bg-secondary">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to get a move on?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Track your career journey with the best tools to do it.
        </p>
        <Button size="lg" className="mt-4">
          Plan Your Trip
          <MapPin className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
