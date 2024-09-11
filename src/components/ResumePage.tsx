import React from 'react';
import { motion } from 'framer-motion';

interface Education {
    degree: string;
    institution: string;
    year: string;
    additionalInfo?: string[];
}

interface Skill {
    category: string;
    items: string[];
}

interface WorkExperience {
    title: string;
    company: string;
    period: string;
    description: string[];
}

const ResumePage: React.FC = () => {
    const education: Education[] = [
        {
            degree: 'Master of Science in Robotics',
            institution: 'University of Michigan',
            year: '2023'
        },
        {
            degree: 'Bachelor of Science in Mechanical Engineering',
            institution: 'Texas A&M University',
            year: '2022',
            additionalInfo: ['Minor in Computer Science', 'Summa Cum Laude', 'Engineering Honors']
        },
    ];

    const skills: Skill[] = [
        {
            category: 'Programming Languages',
            items: ['Python', 'C++', 'Bash', 'SQL', 'JavaScript']
        },
        {
            category: 'Frameworks & Libraries',
            items: ['PyTorch', 'Lightning', 'TensorRT', 'ROS', 'Keras', 'Sci-Kit Learn', 'OpenCV', 'React']
        },
        {
            category: 'Tools & Technologies',
            items: ['Linux', 'Git', 'Docker', 'AWS', 'CI/CD']
        }
    ];

    const workExperience: WorkExperience[] = [
        {
            title: 'Sofware Engineer II',
            company: 'Forterra',
            period: '2024 - Present',
            description: [
                'Lead ML engineer for perception stack',
                'Training and deploying deep learning models',
                'Building scalable ML infrastructure for model training and evaluation',
                'Creating internal tools for data exploration and visualization'
            ]
        },
        {
            title: 'Deep Learning / Perception Intern',
            company: 'Forterra',
            period: 'Summer 2023',
            description: [
                'Integrated state-of-the-art object detection and image segmentation models to achieve simultaneous semantic/panoptic segmentation of image and lidar data',
                'Developed general use point cloud manipulation package for 3D transformations, 3D to 2D projections using camera calibration data to validate sensor calibrations'
            ]
        },
        {
          title: 'Robotics Software Engineering Intern',
          company: 'Forterra',
          period: 'Summer 2022',
          description: [
              'Built containerized version of drone simulation using Docker to improve computational efficiency and speed up development process while maintaining familiar interfacing',
              'Demonstrated virtual sensor, tele-op, route planning/following capabilities using Project GL UE4 simulation with Army Ground Vehicle Systems Center engineers'
          ]
      }
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-accent mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Resume
          </motion.h1>
          
          <motion.div 
            className="mb-12 bg-background-secondary rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-lg font-medium text-text">{edu.degree}</h3>
                <p className="text-text-secondary">{edu.institution}, {edu.year}</p>
                <p className="text-text-secondary">{edu.additionalInfo?.join(' • ')}</p>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="mb-12 bg-background-secondary rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium text-text mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="ring-offset-background border border-accent text-accent px-2 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-background-secondary rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-accent mb-4">Work Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg font-medium text-text">{exp.title}</h3>
                <p className="text-text-secondary mb-2">{exp.company}, {exp.period}</p>
                <ul className="list-disc list-outside pl-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-text-secondary mb-1 ml-4">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    );
};

export default ResumePage;