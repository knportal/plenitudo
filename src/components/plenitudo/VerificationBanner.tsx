"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerificationBanner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "info" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const verified = searchParams.get("verified");
    const error = searchParams.get("error");

    if (verified === "success") {
      setMessage({
        type: "success",
        text: "Email verified! You're on the beta waitlist.",
      });
      setShow(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    } else if (verified === "already") {
      setMessage({
        type: "info",
        text: "Your email is already verified.",
      });
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    } else if (error) {
      let errorText = "An error occurred.";
      if (error === "missing_token") {
        errorText = "Verification link is missing a token.";
      } else if (error === "invalid_token") {
        errorText = "Invalid or expired verification link.";
      } else if (error === "verification_failed") {
        errorText = "Verification failed. Please try again.";
      }

      setMessage({
        type: "error",
        text: errorText,
      });
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }
  }, [searchParams]);

  if (!show || !message) return null;

  const colors = {
    success: "bg-emerald-500",
    info: "bg-blue-500",
    error: "bg-red-500",
  };

  const icons = {
    success: "✓",
    info: "ℹ",
    error: "✕",
  };

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${colors[message.type]} text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[message.type]}</span>
        <span className="font-semibold">{message.text}</span>
        <button
          onClick={() => setShow(false)}
          className="ml-4 hover:opacity-80 transition-opacity"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

