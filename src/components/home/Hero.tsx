'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Portrait first on mobile, right on desktop — brand + face up front */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden bg-muted">
              <Image
                src="/Emma.jpeg"
                alt="Emmanuel Okine"
                fill
                priority
                sizes="(max-width: 1024px) 400px, 420px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-6">
              {site.location}
              {site.available ? ' · Available for work' : ''}
            </p>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-[-0.03em] leading-[0.95] mb-6 text-foreground">
              {site.name}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-4">
              {site.role}. I design and ship payment flows, operational dashboards, and product interfaces for teams in fintech and logistics.
            </p>
            <p className="text-base text-muted-foreground/80 max-w-lg leading-relaxed mb-10">
              Most interested in work that has to hold up when networks drop, devices are slow, and people cannot afford a confusing screen.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
              >
                Get in touch
              </a>
              <a href="#projects" className="text-sm font-medium link-quiet">
                Selected work
              </a>
              <a href={site.resume} download className="text-sm font-medium link-quiet text-muted-foreground">
                Resume
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <span>Fintech</span>
              <span>Logistics</span>
              <span>UI / UX</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
