"use client";
import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        Sign Up
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blur overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                  card: "bg-gray-900 border border-gray-800",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-400",
                  socialButtonsBlockButton:
                    "border-gray-700 text-white hover:bg-gray-800",
                  formFieldLabel: "text-gray-300",
                  formFieldInput: "bg-gray-800 border-gray-700 text-white",
                  footerActionLink: "text-purple-400 hover:text-purple-300",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
