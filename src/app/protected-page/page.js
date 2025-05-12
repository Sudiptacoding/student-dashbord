"use client";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to home page
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    // Render nothing until the check is complete
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>Welcome to the protected page, {user.email}!</p>
    </div>
  );
}
