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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex flex-col h-full border border-border bg-background hover:border-foreground/25 transition-colors"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {project.category}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {project.stage}
            </span>
          </div>
          <h3 className="font-serif text-xl font-medium tracking-tight mb-2 leading-snug group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground truncate">
              {project.techStack.slice(0, 3).join(' · ')}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              View <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
