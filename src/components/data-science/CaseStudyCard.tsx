'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { DataScienceProject } from '@/data/dataScience';

export function CaseStudyCard({
 project,
 index,
}: {
 project: DataScienceProject;
 index: number;
}) {
 const isSvg = project.coverImage.endsWith('.svg');

 return (
 <motion.article
 initial={{ opacity: 0, y: 18 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-40px' }}
 transition={{ duration: 0.45, delay: index * 0.06 }}
 className="group border border-border bg-background overflow-hidden flex flex-col min-w-0"
 >
 <Link href={`/data-science/${project.id}`} className="flex flex-col h-full min-w-0">
 <div className="relative aspect-[16/10] bg-muted overflow-hidden border-b border-border">
 <Image
 src={project.coverImage}
 alt={project.coverAlt}
 fill
 className={isSvg ? 'object-contain p-3 sm:p-5' : 'object-cover object-top'}
 sizes="(max-width: 768px) 100vw, 50vw"
 />
 </div>
 <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1 min-w-0">
 <div className="flex flex-wrap items-center gap-2">
 <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
 {project.domain}
 </span>
 <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground border border-border px-1.5 py-0.5">
 {project.stage}
 </span>
 </div>
 <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight leading-snug group-hover:text-accent transition-colors break-words">
 {project.title}
 </h3>
 <p className="text-sm text-muted-foreground leading-relaxed flex-1">
 {project.summary}
 </p>
 <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground mt-2">
 Read case study
 <ArrowUpRight
 size={16}
 className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
 />
 </span>
 </div>
 </Link>
 </motion.article>
 );
}
