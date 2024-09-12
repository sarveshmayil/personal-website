import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug, Project as ProjectType } from '../utils/projectUtils';
import ReactMarkdown from 'react-markdown';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<(ProjectType & { content: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (slug) {
        const fetchedProject = await getProjectBySlug(slug);
        setProject(fetchedProject || null);
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="mb-4">
        <strong>Technologies:</strong> {project.technologies.join(', ')}
      </div>
      <div className="mb-4">
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="mr-4">GitHub</a>
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>
      <ReactMarkdown>{project.content}</ReactMarkdown>
    </div>
  );
}