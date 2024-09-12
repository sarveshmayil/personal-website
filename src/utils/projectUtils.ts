import projectsData from '../data/projectsData.json';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  markdownFile: string;
}

export function getProjects(): Project[] {
  return projectsData;
}

export async function getProjectBySlug(slug: string): Promise<Project & { content: string } | undefined> {
  const project = projectsData.find(p => p.slug === slug);
  if (project) {
    try {
      const { default: content } = await import(`../projects/${project.markdownFile}`);
      return { ...project, content };
    } catch (error) {
      console.error(`Error importing markdown for ${slug}:`, error);
      return { ...project, content: '' };
    }
  }
  return undefined;
}