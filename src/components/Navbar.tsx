"use client";

import { Activity, Menu, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Activity className="h-6 w-6" />
          <span>SymptoSense AI</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</Link>
          <Link href="#previous" className="hover:text-blue-600 transition-colors">History</Link>
        </div>
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    Hello, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-red-600"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-blue-100 px-4 text-sm font-medium text-blue-900 shadow-sm transition-colors hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-slate-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}
