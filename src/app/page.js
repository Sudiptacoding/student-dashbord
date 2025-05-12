"use client";
import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import mockStudents from "../data/mockStudents";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("students");
      const localStudents = stored ? JSON.parse(stored) : [];

      const all = [...mockStudents, ...localStudents];

      // Remove duplicates by email
      const uniqueStudents = Array.from(
        new Map(all.map((s) => [s.email, s])).values()
      );

      setStudents(uniqueStudents);
    }, 500);
  }, []);

  const filtered = filter
    ? students.filter((s) =>
        s.course.toLowerCase().includes(filter.toLowerCase()) || s.name.toLowerCase().includes(filter.toLowerCase()) || s.email.toLowerCase().includes(filter.toLowerCase())
      )
    : students;

  const handleClick = () => {
    if (user) {
      router.push("/add-student");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300 lg:px-20 px-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">📚 Student List</h1>
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-5 py-2 rounded shadow transition-colors"
        >
          ➕ Add Student
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Filter by course"
        className="w-full max-w-sm px-4 py-2 mb-6 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((student) => (
          <StudentCard key={student.email} student={student} />
        ))}
      </div>
    </div>
  );
}
