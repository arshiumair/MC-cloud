import React from "react";

const Footer = () => (
  <footer className="w-full bg-gray-900 text-indigo-100 py-6 px-4 border-t border-indigo-800 mt-auto">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="font-semibold text-indigo-400">Contact:</span>
        <a href="mailto:your-email@gmail.com" className="ml-2 hover:underline hover:text-indigo-300">arshadatf16@gmail.com</a>
      </div>
      <div className="flex gap-4 items-center">
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-300">LinkedIn</a>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-indigo-300">GitHub Repo</a>
      </div>
      <div className="text-sm text-gray-400 text-center md:text-left max-w-md">
        <span className="font-semibold text-indigo-400">About Project:</span>
        <span className="ml-2">MultiCloud Console is an AI-powered tool for cloud deployment recommendations, cost estimation, and strategy planning across AWS, Azure, and GCP. It helps users make informed decisions and optimize cloud resources for their unique needs.</span>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-4">
      &copy; {new Date().getFullYear()} MultiCloud Console. All rights reserved.
    </div>
  </footer>
);

export default Footer;
