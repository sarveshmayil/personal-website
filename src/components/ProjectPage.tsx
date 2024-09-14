import React, { useState, useEffect, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug, Project as ProjectType } from '../utils/projectUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define the props for our custom code component
interface CodeProps {
  className?: string;
  inline?: boolean;
  children?: React.ReactNode;
}

const customStyle: CSSProperties = {
  ...atomDark,
  fontSize: '14px',
  fontFamily: 'monospace',
};

const CodeBlock: React.FC<React.HTMLProps<HTMLElement> & CodeProps> = ({ className, children, inline, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={customStyle as any}
      language={match[1]}
      PreTag="div"
      {...(props as React.ComponentProps<typeof SyntaxHighlighter>)}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<(ProjectType & { content: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (slug) {
        try {
          const fetchedProject = await getProjectBySlug(slug);
          if (fetchedProject) {
            setProject(fetchedProject);
          } else {
            setError('Project not found');
          }
        } catch (err) {
          setError('Failed to load project');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) return <div className="text-3xl font-bold mb-4 text-center">Loading...</div>;
  if (error) return <div className="text-3xl font-bold mb-4 text-center">Error: {error}</div>;
  if (!project) return <div className="text-3xl font-bold mb-4 text-center">Project not found</div>;

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-2" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
        }}
      >
        {project.content}
      </ReactMarkdown>
    </div>
  );
}