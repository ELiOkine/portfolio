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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex flex-col h-full overflow-hidden rounded-xl border border-border bg-muted/5 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300"
      >
        {/* Clean screenshot, no text over it */}
        <div className="relative aspect-video overflow-hidden bg-muted/20">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className={
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-sm bg-background/85 backdrop-blur-sm text-[10px] font-bold uppercase tracking-tight border " +
            (project.stage === 'Production' ? "text-accent border-accent/40" : "text-muted-foreground border-border")
          }>
            {project.stage === 'Production' && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            )}
            {project.stage}
          </div>
        </div>

        {/* Text on a solid panel, always readable */}
        <div className="flex flex-col flex-1 p-5">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2">
            {project.category}
          </span>
          <h3 className="text-lg font-bold tracking-tight mb-2 leading-snug group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-normal">
            {project.description}
          </p>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground font-medium truncate">
              {project.techStack.slice(0, 3).join('  ·  ')}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-accent shrink-0 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
              Experience <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
