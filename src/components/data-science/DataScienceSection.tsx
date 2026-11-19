'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedDataScienceProjects } from '@/data/dataScience';
import { CaseStudyCard } from './CaseStudyCard';
import { cambridgeCredential } from '@/lib/track';

export default function DataScienceSection() {
  const projects = getFeaturedDataScienceProjects();

  return (
    <section
      id="data-science"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 border-t border-border page-atmosphere overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-4 top-10 font-serif text-[clamp(3.5rem,16vw,14rem)] leading-none text-foreground/[0.035] select-none tracking-tight"
      >
        Data
      </div>

      <div className="max-w-7xl mx-auto relative min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 md:mb-16">
          <div className="max-w-2xl min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-4">
              Data Science &amp; AI
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
              Models judged against baselines, not vibes.
            </h2>
            <p className="mt-4 sm:mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Case studies from the{' '}
              {cambridgeCredential.withPartner}: unsupervised anomaly detection on a public dataset.
              Separate from the software product work.
            </p>
          </div>
          <Link
            href="/data-science"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold border border-border hover:border-accent hover:text-accent transition-colors shrink-0"
          >
            All case studies
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
          {projects.map((project, index) => (
            <CaseStudyCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-xs text-muted-foreground max-w-2xl leading-relaxed"
        >
          Published case studies use public datasets, with operating points, agreement rates, and
          limitations included.
        </motion.p>
      </div>
    </section>
  );
}
