import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../utils/projectUtils';

export const ProjectCard: React.FC<{ project: Project, primary: boolean }> = ({ project, primary = false }) => {
    return (
        <div className={`bg-${primary ? 'background' : 'background-secondary'} rounded-lg shadow-md overflow-hidden`}>
            <div className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
            <p className={`text-${primary ? 'text' : 'text-secondary'} mb-4 flex-grow`}>{project.shortDescription}</p>
            <Link to={`/projects/${project.slug}`} className="text-accent hover:text-accent-hover transition-colors mt-auto">
                Learn More
            </Link>
            </div>
        </div>
    );
}