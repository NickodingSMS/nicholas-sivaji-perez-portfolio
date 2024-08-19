"use client";
import React from 'react';
import MatrixRain from '../MatrixRain';
const references = [
  {
    id: 1,
    name: 'Jane Doe',
    position: 'Project Manager at Tech Innovations',
    contact: 'jane.doe@techinnovations.com',
  },
  {
    id: 2,
    name: 'John Smith',
    position: 'Senior Developer at Code Solutions',
    contact: 'john.smith@codesolutions.com',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    position: 'HR Specialist at FutureTech',
    contact: 'emily.johnson@futuretech.com',
  },
];

const References = () => {
  return (
    
    <div className="flex flex-col items-center p-6 bg-gray-600 min-h-screen">
      <MatrixRain />
      <h1 className="text-3xl font-bold mb-6">References</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">References List</h2>
          <ul className="space-y-4">
            {references.map(ref => (
              <li key={ref.id} className="border-b pb-4">
                <h3 className="text-lg font-semibold">{ref.name}</h3>
                <p className="text-gray-700">{ref.position}</p>
                <p className="text-blue-500">{ref.contact}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Superiors</h2>
          <p className="text-gray-700">
            For contact information of my superiors, please reach out to me directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default References;
