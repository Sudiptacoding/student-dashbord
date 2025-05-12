"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        {/* Left side: Logo + Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Student Dashboard
          </Link>
         
        </div>

        {/* Right side: Theme toggle + Avatar/Login */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl"
            title="Toggle Dark Mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <>
              {/* Dummy Avatar */}
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
