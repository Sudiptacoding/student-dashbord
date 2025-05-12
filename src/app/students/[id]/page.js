'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function StudentDetailsPage() {
  const params = useSearchParams();
  const name = params.get('name');
  const email = params.get('email');
  const course = params.get('course');

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      {/* Top-left link */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Go to Home
        </Link>
      </div>

      {/* Centered card */}
      <div className="flex items-center justify-center h-full pt-16">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Student Details
          </h1>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-semibold">Name:</span> {name || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {email || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Course:</span> {course || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
