import projectsData from '../data/projectsData.json';
import { getAssetUrl } from './assetUtils';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  technologies?: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
  markdownFile: string;
}

export function getProjects(): Project[] {
  return projectsData;
}

export async function getProjectBySlug(slug: string): Promise<Project & { content: string } | undefined> {
  const project = projectsData.find(p => p.slug === slug);
  if (project) {
    try {
      const response = await fetch(getAssetUrl(`/projects/${project.markdownFile}`));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      return { ...project, content };
    } catch (error) {
      console.error(`Error fetching markdown for ${slug}:`, error);
      return { ...project, content: 'Failed to load project content.' };
    }
  }
  return undefined;
}