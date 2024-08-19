"use client";
import Link from 'next/link';
import MatrixRain from '../app/MatrixRain';

const Home: React.FC = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      <MatrixRain />

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 text-gray-100 tracking-tight mt-12">
          Nicholas Sivaji Perez
        </h1>
        <p className="text-2xl lg:text-3xl font-medium text-gray-400">
          Developer
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <Link href="/experience" className="group relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-25 rounded-lg transition"></div>
          <h2 className="relative text-xl font-semibold mb-2 text-gray-100 group-hover:text-white transition">
            Experience
          </h2>
          <p className="relative text-gray-400 group-hover:text-gray-300 transition">
            View my work history and achievements.
          </p>
        </Link>

        <Link href="/about" className="group relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-25 rounded-lg transition"></div>
          <h2 className="relative text-xl font-semibold mb-2 text-gray-100 group-hover:text-white transition">
            About Me
          </h2>
          <p className="relative text-gray-400 group-hover:text-gray-300 transition">
            Learn more about my background and skills.
          </p>
        </Link>

        <Link href="/certifications" className="group relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-25 rounded-lg transition"></div>
          <h2 className="relative text-xl font-semibold mb-2 text-gray-100 group-hover:text-white transition">
            Certifications
          </h2>
          <p className="relative text-gray-400 group-hover:text-gray-300 transition">
            Check out my certifications and qualifications.
          </p>
        </Link>

        <Link href="/references" className="group relative bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-25 rounded-lg transition"></div>
          <h2 className="relative text-xl font-semibold mb-2 text-gray-100 group-hover:text-white transition">
            References
          </h2>
          <p className="relative text-gray-400 group-hover:text-gray-300 transition">
            Read testimonials from colleagues and clients.
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Home;
