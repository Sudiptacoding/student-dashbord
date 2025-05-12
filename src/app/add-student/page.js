"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const router = useRouter();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = localStorage.getItem("students");
    const existing = stored ? JSON.parse(stored) : [];

    const isDuplicate = existing.some((s) => s.email === student.email);
    if (isDuplicate) {
      alert("Student with this email already exists!");
      return;
    }

    const updated = [...existing, student];
    localStorage.setItem("students", JSON.stringify(updated));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md transition duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add Student
        </h2>

        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="course"
          value={student.course}
          onChange={handleChange}
          placeholder="Course"
          className="w-full p-3 mb-6 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
