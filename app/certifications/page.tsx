"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import MatrixRain from '../MatrixRain';
const certifications = [ 
  {
    id: 1,
    title: 'Mendix Rapid Certification',
    image: '/Rapid.jpg',
    downloadLink: '/Rapid.pdf',
  },
  {
    id: 2,
    title: 'Mendix Intermediate Certification',
    image: '/Intermediate.jpg',
    downloadLink: '/Intermediate.pdf',
  },
  {
    id: 3,
    title: 'Low-Code Academy Bootcamp',
    image: '/Lowcode.jpg',
    downloadLink: '/Lowcode.pdf',
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<{ image: string; downloadLink: string } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = (cert: { image: string; downloadLink: string }) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    
    <div className="relative z-10 flex flex-col items-center p-6 bg-gray-900 min-h-screen text-gray-300 mt-12">
     
      <h1 className="text-4xl font-bold mb-8 text-gray-100">Certifications</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map(cert => (
          <div
            key={cert.id}
            className="cursor-pointer bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            onClick={() => handleOpenModal(cert)}
          >
            <Image src={cert.image} 
            alt={cert.title} 
            className="w-full h-auto rounded-lg" 
            width={400}
            height={500}/>
            <h2 className="mt-2 text-xl font-semibold text-gray-100">{cert.title}</h2>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div ref={modalRef} className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              onClick={handleCloseModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <Image src={selectedCert.image} alt="Certificate" className="w-full h-auto mb-4 rounded-lg" />
            <a
              href={selectedCert.downloadLink}
              download
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Certificate
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
