import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        <div className="media-frame project-media relative aspect-[16/11] mb-4 bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <span className="px-2 py-1 text-[10px] uppercase tracking-[0.14em] bg-surface/90 text-foreground backdrop-blur-sm">
              {project.stage}
            </span>
            <span className="w-8 h-8 flex items-center justify-center bg-surface/90 text-foreground opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 backdrop-blur-sm">
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 px-0.5">
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {project.category}
            </span>
            <span className="text-[11px] tabular-nums text-muted-foreground/70">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-medium tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <p className="mt-4 text-[11px] text-muted-foreground/80 tracking-wide">
            {project.techStack.slice(0, 3).join(' · ')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
