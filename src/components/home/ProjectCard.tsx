'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const canTry = Boolean(project.link);
  const reduce = useReducedMotion();

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        <div className="media-frame project-media relative aspect-[16/11] mb-5 bg-muted">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
            <span className="px-2 py-1 text-[10px] uppercase tracking-[0.14em] bg-surface/92 text-foreground backdrop-blur-sm">
              {project.stage}
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-surface/92 text-foreground opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </span>
          </div>
          {canTry && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-1.5 text-[11px] font-medium tracking-wide bg-surface/95 text-foreground backdrop-blur-sm">
                <Play size={11} strokeWidth={2} className="text-accent fill-accent/20" />
                Try the live system
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-0.5">
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {project.category}
            </span>
            <span className="text-[11px] tabular-nums text-muted-foreground/70 font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-serif text-2xl md:text-[1.65rem] font-medium tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <p className="mt-4 text-[11px] text-muted-foreground/75 tracking-wide">
            {project.techStack.slice(0, 3).join(' · ')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
