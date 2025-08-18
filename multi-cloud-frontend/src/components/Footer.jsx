
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";


const Footer = () => (
  <footer className="w-full bg-gray-900 text-indigo-100 py-6 px-4 border-t border-indigo-800 mt-auto">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      {/* About Project - Left */}
      <div className="flex-1 min-w-[200px] text-sm text-gray-400 md:text-left text-center mb-4 md:mb-0">
        <span className="font-semibold text-indigo-400">About Project:</span>
        <span className="ml-2">MultiCloud Console helps teams plan cloud deployments, estimate costs, and optimize strategies across AWS, Azure, and GCP..</span>
      </div>
      {/* Contact - Center */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-[180px] mb-4 md:mb-0">
        <span className="font-semibold text-indigo-400">Contact</span>
        <a href="mailto:arshadatf16@gmail.com" className="hover:underline hover:text-indigo-300 mt-1">arshadatf16@gmail.com</a>
      </div>
      {/* Social - Right */}
      <div className="flex-1 flex flex-col md:items-end items-center min-w-[180px]">
        <span className="font-semibold text-indigo-400 mb-1">Connect</span>
        <div className="flex gap-4 mt-1">
          <a href="https://www.linkedin.com/in/muhammad-arshad-530b6b354/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition flex items-center gap-1">
            <FaLinkedin className="inline-block text-xl" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://github.com/arshiumair/MC-cloud" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 transition flex items-center gap-1">
            <FaGithub className="inline-block text-xl" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-6 ">
      &copy; {new Date().getFullYear()}MultiCloud Console. All rights reserved. | Built with React & TailwindCSS
    </div>
  </footer>
);

export default Footer;
