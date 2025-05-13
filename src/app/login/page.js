"use client";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../../firebase.config";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/");
    } catch (err) {
     
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
     
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded p-2 mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-4"
        >
          Login
        </button>

        {/* <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8C488 403.3 391.6 504 248 504 110.8 504 8 401.2 8 264S110.8 24 248 24c66.8 0 122.7 24.2 166.2 63.8l-67.4 64.2C318.4 119.6 286.4 104 248 104c-82.4 0-149.2 69.4-149.2 160S165.6 424 248 424c76.6 0 121-54.2 126.6-102.4H248v-82.8h240z" />
          </svg>
          Sign in with Google
        </button> */}
      </form>
    </div>
  );
}
