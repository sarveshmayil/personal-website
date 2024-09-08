import React from 'react';

function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Project 1 */}
        <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-text mb-2">Project 1</h3>
            <p className="text-text-secondary mb-4">Brief description of Project 1. Highlight key features and technologies used.</p>
            <a href="#" className="text-accent hover:text-accent-hover transition-colors">Learn More</a>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-text mb-2">Project 2</h3>
            <p className="text-text-secondary mb-4">Brief description of Project 2. Explain its purpose and your role in it.</p>
            <a href="#" className="text-accent hover:text-accent-hover transition-colors">Learn More</a>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-background-secondary rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-text mb-2">Project 3</h3>
            <p className="text-text-secondary mb-4">Brief description of Project 3. Mention any notable achievements or challenges overcome.</p>
            <a href="#" className="text-accent hover:text-accent-hover transition-colors">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;