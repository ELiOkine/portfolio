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
    <section id="projects" className="py-24 px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Selected <span className="text-gradient">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              Production systems and product builds across fintech, logistics, and mobile.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-white border border-border shadow-sm">
            {['All', 'Engineering', 'Design', 'Fullstack'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-tight transition-all",
                  filter === f 
                    ? "bg-accent text-white shadow-md shadow-accent/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
