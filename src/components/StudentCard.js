import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function StudentCard({ student }) {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <Link
          href={{
            pathname: "/students/details",
            query: {
              name: student.name,
              email: student.email,
              course: student.course,
            },
          }}
          className="block border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out hover:scale-[1.02]"
        >
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
            {student.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">{student.email}</p>
          <p className="italic text-sm text-gray-500 dark:text-gray-400">
            {student.course}
          </p>
        </Link>
      ) : (
        <Link
          href="/login"
          className="block border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out hover:scale-[1.02]"
        >
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
            {student.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">{student.email}</p>
          <p className="italic text-sm text-gray-500 dark:text-gray-400">
            {student.course}
          </p>
        </Link>
      )}
    </div>
  );
}
