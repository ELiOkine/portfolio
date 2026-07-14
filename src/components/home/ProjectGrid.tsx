'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-24 md:py-32 px-6 border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-3">
              Selected projects
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Production systems and product builds across fintech, logistics, and mobile.
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {['All', 'Engineering', 'Design', 'Fullstack'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium transition-colors',
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
