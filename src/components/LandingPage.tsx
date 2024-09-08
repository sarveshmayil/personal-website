import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-accent">
                Sarvesh Mayilvahanan
              </h1>
              <p className="mx-auto max-w-[700px] text-text-secondary md:text-xl">
                A brief introduction about yourself and your expertise. Highlight your key skills and what you're passionate about.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/projects" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-accent text-background hover:bg-accent-hover h-10 py-2 px-4">
                View Projects
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-accent text-accent hover:bg-accent hover:text-background h-10 py-2 px-4">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Featured Projects</h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text">Project 1</h3>
              <p className="text-text-secondary">Brief description of Project 1</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text">Project 2</h3>
              <p className="text-text-secondary">Brief description of Project 2</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text">Project 3</h3>
              <p className="text-text-secondary">Brief description of Project 3</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;