import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
// import InteractiveGrid from './InteractiveGrid';

interface Project {
    title: string;
    shortDescription: string;
    longDescription: string;
    image: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0.3, 0.4], ["200px", "600px"]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ height }}
            className="bg-background rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <div className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
                <p className="text-text-secondary mb-4">{project.shortDescription}</p>
                <motion.div style={{ opacity }} className="flex-grow overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover mb-4" />
                    <p className="text-text-secondary mb-4">{project.longDescription}</p>
                </motion.div>
                <Link 
                    to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-accent hover:text-accent-hover transition-colors mt-auto"
                >
                    Learn More
                </Link>
            </div>
        </motion.div>
    );
};

const LandingPage: React.FC = () => {
    const mainSectionRef = useRef<HTMLElement>(null);

    const featuredProjects: Project[] = [
        {
            title: 'Project 1',
            shortDescription: 'Brief description of Project 1.',
            longDescription: 'Detailed description of Project 1. Highlight key features, technologies used, and your role in the project.',
            image: 'https://via.placeholder.com/400x200?text=Project+1'
        },
        {
            title: 'Project 2',
            shortDescription: 'Brief description of Project 2.',
            longDescription: 'Detailed description of Project 2. Explain its purpose, challenges overcome, and the impact of the project.',
            image: 'https://via.placeholder.com/400x200?text=Project+2'
        },
        {
            title: 'Project 3',
            shortDescription: 'Brief description of Project 3.',
            longDescription: 'Detailed description of Project 3. Mention any notable achievements, lessons learned, and future improvements.',
            image: 'https://via.placeholder.com/400x200?text=Project+3'
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <section ref={mainSectionRef} className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center relative overflow-hidden">
                {/* <InteractiveGrid containerRef={mainSectionRef} /> */}
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
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
                <div className="container px-4 md:px-6 mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-accent mb-8">Featured Projects</h2>
                    <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3 justify-center">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;