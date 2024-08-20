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
                src="/portrait.JPG"
                width={100}
                height={100}
                alt="Nicholas Sivaji Perez"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl ">
            From a young age, I&apos;ve been captivated by technology and the limitless possibilities it offers. My journey into the world of coding began with a deep love for old video games and flash browser games, which sparked my curiosity about how things worked behind the scenes. This passion led me to explore the inner workings of these games, fueling a desire to create and innovate in the digital space.

In high school, I formalized my interest by taking coding classes, including AP Computer Science. These classes provided a solid foundation in programming principles and further ignited my passion for software development. However, my journey started much earlier—back in 5th grade, when my teacher would turn to me whenever she encountered computer issues. Even then, I was the go-to problem solver, eager to learn and assist.

In that same year, 2010, I challenged myself to push the boundaries of what my very old laptop could do. Through sheer determination and resourcefulness, I managed to play GameCube games on it using a PS3 controller by spoofing the drivers. This achievement was more than just a technical feat; it was a testament to my relentless curiosity and drive to overcome limitations. I also explored the world of emulation, always ensuring that I only emulated games I owned, respecting the legal boundaries of this practice.

My fascination with technology didn&apos;t stop there. I delved into modding old game textures and data, utilizing tools like Cheat Engine to modify game elements such as points and lives by directly manipulating the RAM. These early experiences taught me the power of code and how it can transform the user experience, even in unexpected ways.

Today, this passion continues to drive me as I seek out new challenges and opportunities to learn. My journey from a young gamer to a tech enthusiast has shaped who I am as a developer, and I am excited to continue exploring the ever-evolving world of technology.
            </p>
           
          </div>
        </section>

        <section className="bg-gray-800/90 p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 text-white">About My Work</h2>
          <p className="text-xl text-gray-300 mb-6">
          After graduating from high school, I was eager to jumpstart my career in technology. My journey began when I secured an internship at a tech company called S4-Digital. During my time there, I was trained in HTML/CSS and enrolled in a bootcamp focused on low-code development, specifically using Mendix. This experience was pivotal in my growth as a developer, as it introduced me to key concepts like APIs, JavaScript, and jQuery.

At a European company called S4-Digital, I gained hands-on experience working in an Agile Scrum environment. I learned the importance of documentation, version control using Git and Jira, and effective team coordination to develop in-house applications. I also had the opportunity to shadow some of the most experienced developers, who guided me in honing my skills as a front-end developer. Their mentorship was invaluable, helping me develop a strong foundation in front-end technologies.

As my skills grew, I began seeking opportunities closer to home, ideally within the Eastern Standard Time zone, as working across different time zones was starting to impact my schedule. My dedication and expertise caught the attention of the company&apos;s president, who offered me a position as a Solutions Engineer/Architect. In this role, I was entrusted with the entire front-end development process, including SCSS files and layout designs. I also took on the responsibility of mentoring junior Mendix developers, helping them navigate and complete their tasks, especially those related to front-end development.

During my time in this role, I became the go-to front-end developer, further advancing my skills in React, JavaScript, SCSS, and CSS. I was not only fixing bugs but also managing APIs for other developers who were less familiar with Mendix, a relatively new platform. This experience solidified my expertise in front-end development and deepened my understanding of how to build and maintain complex applications.

Currently, I am exploring new opportunities as my previous role was contract-based, and my employer has encouraged me to seek full-time positions. This decision was driven by a slowdown in client acquisition, and my boss has been fully supportive of my job search. I am now looking for a full-time role where I can continue to apply my front-end development skills and contribute to innovative projects.
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
              My passion for my work is deeply rooted in the love I have for my family. They are my inspiration and the reason I strive to excel in everything I do. My wife is a beautiful and loving person who supports me in all my endeavors. Her unwavering belief in me fuels my drive to succeed, and I am incredibly grateful for her presence in my life.

Our daughter, a gentle and happy little baby, brings immense joy to our home. Her laughter and curiosity remind me daily of the importance of creating a secure and nurturing environment. With another baby on the way, my heart is filled with even more love and determination to provide for and protect my growing family.

Remote work is essential to me because it allows me to work from the comfort of my home while being present for my wife and daughter. I prioritize my family above all else, and having the flexibility to be there for them whenever they need me is invaluable. My work is not just a career—it&apos;s a means to ensure that my loved ones have everything they need to thrive.

I am deeply committed to providing for my family and creating a future where they feel safe, loved, and supported. Their happiness and well-being are my top priorities, and I approach my work with the same dedication and passion that I bring to caring for them.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;