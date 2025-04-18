import React from 'react';
import MatrixRain from '../MatrixRain';
import Image from 'next/image';

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-8 text-center mt-12 text-white">About Me</h1>

        {/* About Me Section */}
        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="relative mb-6 w-24 h-24 sm:w-40 sm:h-40 md:w-32 md:h-32">
              <Image
                src="/portrait.JPG"
                width={100}
                height={100}
                alt="Nicholas Sivaji Perez"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className="text-xl text-gray-300 text-center max-w-3xl">
              From a young age, I&apos;ve been captivated by technology and the limitless possibilities it offers.
              My journey into the world of coding began with a deep love for old video games and flash browser games,
              which sparked my curiosity about how things worked behind the scenes.
              <br /><br />
              In high school, I formalized my interest by taking coding classes, including AP Computer Science. These
              classes provided a solid foundation in programming principles and further ignited my passion for
              software development. However, my journey started much earlier—back in 5th grade, when my teacher would
              turn to me whenever she encountered computer issues.
              <br /><br />
              In that same year, 2010, I challenged myself to push the boundaries of what my very old laptop could do.
              Through sheer determination, I managed to play GameCube games on it using a PS3 controller by spoofing
              the drivers. This achievement was more than just a technical feat—it was a testament to my curiosity
              and drive to overcome limitations.
              <br /><br />
              I also explored the world of emulation and game modding, learning how tools like Cheat Engine worked by
              modifying game memory. These early experiences taught me the power of code and its ability to shape
              user experiences. Today, that same passion drives me as I continue learning and building in the ever-evolving
              tech landscape.
            </p>
          </div>
        </section>

        {/* About My Work Section */}
        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4 text-white text-center">About My Work</h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl">
              After graduating from high school, I landed an internship at S4-Digital, where I was trained in HTML/CSS
              and enrolled in a low-code Mendix bootcamp. This experience introduced me to APIs, JavaScript, and jQuery.
              <br /><br />
              Working in an Agile Scrum environment, I learned key practices like version control with Git and Jira,
              documentation, and team coordination. I was mentored by senior developers who helped refine my skills as
              a front-end developer.
              <br /><br />
              As I progressed, I was offered a Solutions Engineer/Architect role, where I led front-end development
              tasks, designed layouts, handled SCSS, and mentored junior developers. I also managed APIs for other developers
              unfamiliar with Mendix, becoming the go-to front-end specialist.
              <br /><br />
              Today, I am exploring new full-time opportunities, as my previous role was contract-based. I’m eager to bring
              my front-end expertise and passion for clean, scalable UI to a new team working on innovative projects.
            </p>
          </div>
        </section>

        {/* About My Family Section */}
        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4 text-white text-center">About My Family</h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl">
              My passion for my work is deeply rooted in the love I have for my family. They are my inspiration and the
              reason I strive to excel in everything I do. My wife is a beautiful and loving person who supports me
              unconditionally, and I’m incredibly grateful for her.
              <br /><br />
              Our daughter brings immense joy and curiosity into our lives, and with another baby on the way, I’m even
              more driven to provide a safe, loving, and stable environment for them.
              <br /><br />
              Remote work is essential to me as it allows me to be present with my family while pursuing a fulfilling
              career. Their happiness and well-being are my top priorities, and I carry that same commitment and
              dedication into my work every single day.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
