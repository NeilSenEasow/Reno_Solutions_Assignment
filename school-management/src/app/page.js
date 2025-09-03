import Link from "next/link";
import { FaPlusCircle, FaListAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          School Management
        </h1>
        <p className="text-xl text-gray-600">
          A simple application to manage school data.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <Link
          href="/addSchool"
          className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
        >
          <FaPlusCircle size={48} className="text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Add School</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Create a new school entry in the database.
          </p>
        </Link>
        <Link
          href="/showSchools"
          className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
        >
          <FaListAlt size={48} className="text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Show Schools</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            View the list of all schools in a catalog.
          </p>
        </Link>
      </div>
    </div>
  );
}
