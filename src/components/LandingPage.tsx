import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import CloudParticles from "./InfinityCloud/_CloudParticles";
import FloatingParticles from "./InfinityCloud/_FloatingParticles";
import { getCSSVariable } from "../utils/cssUtils";
import { Project } from '../utils/projectUtils';
import { ProjectCard } from './Projects/ProjectCard';
import projectsData from '../data/projectsData.json';

const LandingPage: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [fogColor, setFogColor] = useState<string>('');

    useEffect(() => {
        setBackgroundColor(getCSSVariable('--color-background'));
        setFogColor(getCSSVariable('--color-background-dark'));
    }, []);

    const featuredProjectSlugs: string[] = ['transfuser', 'virdo', 'botlab']
    const featuredProjects: Project[] = projectsData.filter(project => featuredProjectSlugs.includes(project.slug));

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-auto">
                    <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                        <color attach="background" args={[backgroundColor]} />
                        <fog attach="fog" args={[fogColor, 2, 3]} />
                        <CloudParticles />
                        <FloatingParticles />
                        <OrbitControls />
                    </Canvas>
                </div>
                <div className="container px-4 md:px-6 relative z-10 pointer-events-none">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2 user-select-none">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-accent">
                                Sarvesh Mayilvahanan
                            </h1>
                            <br />
                            <p className="mx-auto max-w-[700px] text-text-secondary md:text-xl">
                                I like teaching robots how to do things. I'm a robotics software engineer with a focus on machine learning and perception.
                                <br /><br />
                                Currently, I work on autonomous vehicles, training and deploying models as well as building up the ML infrastructure for the perception stack as the main Machine Learning Engineer.
                            </p>
                        </div>
                        <div className="space-x-4 pointer-events-auto">
                            <Link to="/projects" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-accent text-background hover:bg-accent-hover h-10 py-2 px-4">
                                View Projects
                            </Link>
                            <Link to="https://www.linkedin.com/in/sarvesh-mayilvahanan/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-accent text-accent hover:bg-accent hover:text-background h-10 py-2 px-4">
                                Contact Me
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background-secondary relative z-20">
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Featured Projects</h2>
                    <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3 justify-center">
                        {featuredProjects.map((project) => (
                            <ProjectCard project={project} primary={true} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;