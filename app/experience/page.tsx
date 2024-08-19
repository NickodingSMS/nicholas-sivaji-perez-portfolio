'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import MatrixRain from '../MatrixRain';
export default function Experience() {
  const [catImage, setCatImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCatImage();
  }, []);

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      setCatImage(data[0].url);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
    <MatrixRain />
    <div className="relative z-10 p-6">
    <h1 className="text-3xl font-bold mb-8 text-center mt-12 text-gray-200">Experience</h1>

    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <p className="text-lg text-gray-300 mb-4">
        I bring a wealth of experience as a Solutions Engineer, Architect, and Mendix Low-Code Developer, with expertise in front-end development, API integration, Agile methodologies, and scalable system design. Below are the key areas where I have made significant contributions:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Architected and implemented scalable, modular front-end solutions using React.js, ensuring maintainability and efficient code reuse.</li>
          <li>Optimized Mendix microflows and nanoflows, leading to a 30% improvement in workflow performance and system responsiveness.</li>
          <li>Leveraged JavaScript ES6+ features, including async/await and Promises, to streamline asynchronous operations and improve application performance.</li>
          <li>Designed and implemented RESTful API integrations, utilizing tools like Postman for testing and Swagger for documentation, ensuring seamless communication between systems.</li>
          <li>Enhanced user interfaces using CSS3, SCSS, and Tailwind CSS, resulting in responsive, accessible, and visually appealing designs.</li>
          <li>Applied Agile principles, including SCRUM and Kanban, to manage and deliver high-priority projects on time, with a focus on continuous improvement and iterative development.</li>
          <li>Implemented CI/CD pipelines using Git, Jenkins, and Docker, automating testing and deployment processes to ensure consistent delivery of high-quality code.</li>
          <li>Performed comprehensive code reviews and pair programming sessions, promoting best practices in coding standards, design patterns, and software architecture.</li>
          <li>Utilized modern JavaScript libraries such as Axios for HTTP requests and Redux for state management, enhancing the application&apos;s data flow and user experience.</li>
          <li>Integrated third-party services and APIs, including Firebase, AWS S3, and Google Maps API, expanding the functionality and reach of web applications.</li>
          <li>Documented technical processes, system designs, and codebases in Confluence and GitHub Wikis, fostering knowledge sharing and collaboration across teams.</li>
          <li>Managed and optimized SQL and NoSQL databases, including MySQL and MongoDB, ensuring high performance and data integrity in large-scale applications.</li>
          <li>Conducted performance profiling and optimization using tools like Chrome DevTools and Lighthouse, reducing load times and improving overall user experience.</li>
          <li>Collaborated closely with UX/UI designers to translate design prototypes into functional, interactive, and user-friendly web applications.</li>
          <li>Mentored junior developers, providing guidance on best practices, code quality, and professional development, contributing to the growth and success of the team.</li>
          <li>Engaged in continuous learning and professional development, staying up-to-date with the latest industry trends, technologies, and best practices in web development.</li>
        </ul>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Proof of Experience</h2>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">API Usage Example-Cat API</h3>
          {loading ? (
            <div>
              <p className="text-lg text-gray-400 mb-4">Fetching...</p>
              <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div>
              {catImage ? (
                <Image
                src={catImage}
                alt="Random Cat"
                width={400} // Adjust width as needed
                height={400} // Adjust height as needed
                className="w-full max-w-xs rounded-lg shadow-lg mx-auto"
              />
              ) : (
                <p className="text-lg text-gray-400 mb-4">No cat image available</p>
              )}
              <button
                onClick={fetchCatImage}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate Another Cat
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">API Usage Example: Google Maps</h3>
          <div className="w-full h-72 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39785.82778190831!2d-122.10466938567195!3d37.38605153100595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5e0da40ae73%3A0x1b5f6f0c6164a6db!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v1692900000000!5m2!1sen!2sus"
              className="w-full h-full border-0 rounded-lg"
              
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Silicon Valley Map"
            ></iframe>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Silicon Valley on a Google map API.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}