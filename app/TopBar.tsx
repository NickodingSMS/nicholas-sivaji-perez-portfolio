'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isContactOpen, setContactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleContact = () => setContactOpen(!isContactOpen);

  // Handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full backdrop-blur-sm shadow-sm p-4 flex justify-between items-center bg-gray-900 z-40">
      <div className="flex-1">
        {pathname !== "/" && (
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }} 
            className="text-blue-300 underline hover:text-blue-700 transition text-lg sm:text-sm"
          >
            Back
          </Link>
        )}
      </div>

      <div className="relative flex items-center">
        <button
          onClick={toggleContact}
          className="text-blue-300 underline hover:text-blue-700 transition text-lg sm:text-sm"
        >
          Contact Me
        </button>
        {isContactOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-48 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 z-50"
          >
            <p className="text-gray-300 mb-2"><strong>Email:</strong> nicholassivaji@gmail.com</p>
            <p className="text-gray-300 mb-2"><strong>Phone:</strong> (954) 736-6645</p>
            <p className="text-gray-300">
              <strong>LinkedIn:</strong> 
              <Link href="https://www.linkedin.com/in/nicholas-sivaji-perez/" className="text-blue-600 underline hover:text-blue-800 ml-1" target="_blank" rel="noopener noreferrer">
                My LinkedIn
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
