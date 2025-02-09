"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { isSignedIn } = useUser();
  const [mode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        You&apos;re already signed in!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[500px] p-6">
        <CardHeader>
          <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          {mode === "signin" ? (
            <SignIn afterSignInUrl="/dashboard" />
          ) : (
            <SignUp afterSignUpUrl="/dashboard" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
