import React from 'react';
import { Link } from 'react-router-dom';
import { getProjects, Project } from '../utils/projectUtils';

function ProjectsPage() {
  const projects: Project[] = getProjects();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.slug} className="bg-background-secondary rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
              <p className="text-text-secondary mb-4">{project.shortDescription}</p>
              <Link to={`/projects/${project.slug}`} className="text-accent hover:text-accent-hover transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;