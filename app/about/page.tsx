import React from 'react';
import MatrixRain from '../MatrixRain';
import Image from 'next/image';

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-8 text-center mt-12 text-white">About Me</h1>

        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-6 w-24 h-24 sm:w-40 sm:h-40 md:w-32 md:h-32">
              <Image
                src="/portrait.jpg"
                width={100}
                height={100}
                alt="Nicholas Sivaji Perez"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl text-center">
              A highly skilled Mendix Developer with extensive experience in front-end development, data management, and system optimization. Demonstrated ability to independently resolve complex issues, streamline workflows, and deliver high-quality solutions in Agile environments. Adept at collaborating with cross-functional teams to achieve project success and exceed client expectations.
            </p>
            <div className="text-lg text-gray-400 text-center">
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
          </div>
        </section>

        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 text-white">About My Work</h2>
          <p className="text-xl text-gray-300 mb-6">
            As a Mendix Developer, I specialize in crafting efficient solutions and optimizing workflows. My experience spans front-end development, API integration, and Agile methodologies, allowing me to deliver high-quality applications that meet user needs and exceed expectations.
          </p>
        </section>

        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="relative w-72 h-auto mb-4 lg:mb-0 lg:mr-8 flex-shrink-0">
              <Image
                src="/familypicture.jfif" 
                alt="Family Picture" 
                width={400}
                height={400}
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white">About My Family</h2>
              <p className="text-xl text-gray-300">
                This section is dedicated to sharing some information about my family. They have been a great support system and are an integral part of my life. I value the time spent with them and cherish our moments together.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;