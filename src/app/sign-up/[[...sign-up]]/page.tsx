import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
            card: "bg-gray-900 border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "border-gray-700 text-white hover:bg-gray-800",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-gray-800 border-gray-700 text-white",
            footerActionLink: "text-purple-400 hover:text-purple-300",
          },
        }}
      />
    </div>
  );
} 