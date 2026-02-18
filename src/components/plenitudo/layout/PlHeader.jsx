"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import PlLogoMark from "../PlLogoMark";

export default function PlHeader() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle hash scrolling after navigation and hash changes
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }
      };

      // Handle initial hash
      handleHashChange();

      // Listen for hash changes
      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }
  }, [pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong");
        return;
      }

      // Check if verification is required
      if (data.requiresVerification) {
        setStatus("success");
        setErrorMessage(""); // Clear any previous errors
        // Keep modal open longer to show verification message
        setTimeout(() => {
          setIsModalOpen(false);
          setEmail("");
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          setEmail("");
          setStatus("idle");
        }, 2000);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <header className="flex items-center justify-between relative z-50">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-1 -mx-1 hover:opacity-90 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <PlLogoMark size="sm" />
          <span className="sr-only">Plenitudo.ai Home</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
          <Link className="navlink" href="/#feed-title">
            Feed
          </Link>
          <Link className="navlink" href="/#rooms-title">
            Rooms
          </Link>
          <Link className="navlink" href="/#prompts-title">
            Prompts
          </Link>
          <Link className="navlink" href="/app">
            Apps
          </Link>
          <button
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            Join beta
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <style>{`
          .navlink { padding:.5rem .75rem; border-radius:.75rem; font-size:.875rem; color: rgba(255,255,255,0.8); display: inline-block; min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center; }
          .navlink:hover, .navlink:focus { outline:none; background:rgba(255,255,255,0.06); color:white }
        `}</style>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <nav
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-sm border-t border-white/5 rounded-b-lg shadow-xl z-40"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3 space-y-2">
            <Link
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
              href="/#feed-title"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Feed
            </Link>
            <Link
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
              href="/#rooms-title"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
              href="/#prompts-title"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prompts
            </Link>
            <Link
              className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
              href="/app"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apps
            </Link>
            <button
              className="w-full px-4 py-3 rounded-lg font-semibold text-sm bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 text-emerald-300 hover:from-emerald-500/30 hover:to-blue-500/30 transition-all min-h-[44px] flex items-center justify-center"
              onClick={() => {
                setIsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              type="button"
            >
              Join beta
            </button>
          </div>
        </nav>
      )}

      {mounted &&
        isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={() => {
              if (status !== "loading") {
                setIsModalOpen(false);
                setEmail("");
                setStatus("idle");
                setErrorMessage("");
              }
            }}
          >
            <div
              className="bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full ring-1 ring-white/10 shadow-2xl relative mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                Join the Beta
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mb-4">
                Get early access to new features and help shape the future of
                Plenitudo.ai
              </p>

              {status === "success" ? (
                <div className="text-center py-3 sm:py-4">
                  <div className="text-emerald-400 text-base sm:text-lg font-semibold mb-2">
                    ✓ Check your email!
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm mb-2">
                    We&apos;ve sent you a verification email. Please click the
                    link in the email to confirm your address and complete your
                    signup.
                  </p>
                  <p className="text-slate-400 text-[10px] sm:text-xs">
                    Didn&apos;t receive it? Check your spam folder.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === "loading"}
                      className="w-full px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-white text-sm sm:text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 disabled:opacity-50 min-h-[44px]"
                    />
                  </div>
                  {status === "error" && errorMessage && (
                    <div className="text-red-400 text-xs sm:text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEmail("");
                        setStatus("idle");
                        setErrorMessage("");
                      }}
                      disabled={status === "loading"}
                      className="w-full sm:flex-1 px-4 py-3 sm:py-2.5 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] text-sm sm:text-base font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:flex-1 px-4 py-3 sm:py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] text-sm sm:text-base"
                    >
                      {status === "loading" ? "Joining..." : "Join"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
