// src/components/Projects.js
import React from 'react';

function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="font-bold text-xl mb-2">Project 1</h3>
          <p>A description of my project. Built with React and Tailwind CSS.</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="font-bold text-xl mb-2">Project 2</h3>
          <p>Another project with cool features!</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;
