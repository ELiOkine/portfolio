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
    <section id="projects" className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 border-t border-border bg-surface overflow-hidden">
      {/* Oversized section watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-8 font-serif text-[clamp(4rem,18vw,16rem)] leading-none text-foreground/[0.035] select-none tracking-tight"
      >
        Work
      </div>

      <div className="max-w-7xl mx-auto relative min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 md:mb-16 gap-6 sm:gap-8">
          <div className="max-w-2xl min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-4">
              Selected work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
              Systems that move money, fleets, and people.
            </h2>
            <p className="mt-4 sm:mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Each production piece opens a working preview. Click through, click around, try the live system on this site.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 border-b border-border pb-1">
            {['All', 'Engineering', 'Design', 'Fullstack'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'relative px-3 py-2 text-xs font-medium transition-colors',
                  filter === f ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {f}
                {filter === f && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute left-3 right-3 -bottom-1 h-px bg-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
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
