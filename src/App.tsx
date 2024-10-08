import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import ProjectPage from './components/Projects/ProjectPage';
import ResumePage from './components/ResumePage';
import NotFoundPage from './components/NotFoundPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-text">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b border-secondary">
          <Link className="flex items-center justify-center" to="/">
            <span className="sr-only">Sarvesh Mayilvahanan</span>
            <span className="font-bold text-xl text-accent">SM</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-accent transition-colors" to="/projects">
              Projects
            </Link>
            <Link className="text-sm font-medium hover:text-accent transition-colors" to="/resume">
              Resume
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-secondary">
          <p className="text-xs text-text-secondary">© 2024 Sarvesh Mayilvahanan. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:text-accent transition-colors" href="https://github.com/sarveshmayil" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="text-xs hover:text-accent transition-colors" href="https://www.linkedin.com/in/sarvesh-mayilvahanan/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
        </footer>
      </div>
    </Router>
  );
}

export default App;