import React from 'react';
import { getProjects, Project } from '../../utils/projectUtils';
import { ProjectCard } from './ProjectCard';


function ProjectsPage() {
  const projects: Project[] = getProjects();

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} primary={false} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;