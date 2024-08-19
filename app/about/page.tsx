import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 p-6">
      {/* About Me Section */}
      <section className="flex flex-col items-center mb-12 text-center">
        {/* Circular Profile Image */}
        <div className="relative mb-6 w-24 h-24 sm:w-40 sm:h-40 md:w-32 md:h-32 z-0 ">
  <img 
    src="/portrait.jpg" 
    alt="Nicholas Sivaji Perez" 
    className="w-full h-full rounded-full object-cover z-0" 
  />
</div>


        {/* About Content */}
        <h1 className="text-5xl font-extrabold mb-6 text-white">About Me</h1>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl">
          A highly skilled Mendix Developer with extensive experience in front-end development, data management, and system optimization. Demonstrated ability to independently resolve complex issues, streamline workflows, and deliver high-quality solutions in Agile environments. Adept at collaborating with cross-functional teams to achieve project success and exceed client expectations.
        </p>
        <div className="text-lg text-gray-400">
          <p className="font-semibold">Orlando, FL</p>
          <p>(954) 736-6645 | nicholassivaji@gmail.com</p>
          <p>
            <a 
              href="https://www.linkedin.com/in/nicholassivaji" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </section>

      {/* About My Work Section */}
      <section className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">About My Work</h2>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl">
          As a Mendix Developer, I specialize in crafting efficient solutions and optimizing workflows. My experience spans front-end development, API integration, and Agile methodologies, allowing me to deliver high-quality applications that meet user needs and exceed expectations.
        </p>
      </section>

      {/* About My Family Section */}
      <section className="flex flex-col items-center lg:flex-row lg:items-start">
        <div className="relative w-72 h-72 mb-4 lg:mb-0 lg:mr-8">
          <img 
            src="/familypicture.jfif" 
            alt="Family Picture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4 text-white">About My Family</h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            This section is dedicated to sharing some information about my family. They have been a great support system and are an integral part of my life. I value the time spent with them and cherish our moments together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
