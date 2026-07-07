'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Selected <span className="text-accent underline decoration-accent/10 underline-offset-4">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              A collection of functional systems built with modern web technologies.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Engineering', 'Design', 'Fullstack'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-md border text-[11px] font-bold uppercase tracking-tight transition-all",
                  filter === f 
                    ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                    : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
