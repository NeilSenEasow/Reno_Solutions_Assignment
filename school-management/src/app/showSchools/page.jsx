"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Our School Catalog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.length > 0 ? (
          schools.map((school, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full h-56 relative overflow-hidden">
                <Image
                  src={school.image}
                  alt={school.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {school.name}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Address:</span> {school.address}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">City:</span> {school.city}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No schools found. Add some from the "Add School" page!
          </div>
        )}
      </div>
    </div>
  );
}