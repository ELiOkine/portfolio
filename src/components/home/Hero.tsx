'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

const focusAreas = ['Fintech', 'Logistics', 'Product UI'];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-20">
      {/* Ambient background */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div
        className="absolute inset-0 z-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-left order-2 lg:order-1"
          >
            {site.available && (
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-accent/20 bg-white/80 backdrop-blur-sm text-[11px] font-bold uppercase tracking-widest text-muted-foreground shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </div>
            )}

            <p className="text-sm font-semibold text-muted-foreground mb-4 tracking-tight">
              Hi, I&apos;m <span className="text-foreground">{site.name}</span>
            </p>

            <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.04em] mb-6 leading-[0.98]">
              Building functional software with{' '}
              <span className="text-gradient">intent</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4 leading-relaxed">
              Software engineer and designer in Accra, shipping fast, reliable products for fintech and logistics: payment flows, operational dashboards, and onboarding that hold up on real devices and networks.
            </p>
            <p className="text-sm md:text-base text-muted-foreground/75 max-w-lg mb-8 font-medium">
              I love turning messy, high-stakes requirements into interfaces people actually understand.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground rounded-xl font-bold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Let&apos;s work together
                <ArrowRight size={18} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/90 border border-border rounded-xl font-bold hover:bg-white hover:border-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
              >
                View selected work
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-accent" />
                {site.location}
              </span>
              <span className="hidden sm:inline text-border">·</span>
              <span>Featured:{' '}
                <a href="/projects/ismartpay" className="text-accent link-underline normal-case tracking-normal font-semibold">
                  iSmartPay
                </a>
              </span>
            </div>
          </motion.div>

          {/* Portrait — visible immediately */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Gradient glow behind portrait */}
              <div className="absolute -inset-4 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl" aria-hidden />

              <div className="portrait-frame relative aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src="/Emma.jpeg"
                  alt="Emmanuel Okine — Software Engineer & UI/UX Designer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 380px, 420px"
                  className="object-cover object-top"
                />
                {/* Soft bottom fade for overlay legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

                {/* Identity overlay on photo */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1">
                    Software Engineer &amp; Designer
                  </p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{site.name}</p>
                </div>
              </div>

              {/* Floating focus chips */}
              <div className="absolute -left-2 sm:-left-6 top-[18%] premium-chip shadow-lg">
                {focusAreas[0]}
              </div>
              <div className="absolute -right-1 sm:-right-4 top-[42%] premium-chip shadow-lg">
                {focusAreas[1]}
              </div>
              <div className="absolute left-4 sm:left-0 -bottom-3 premium-chip shadow-lg">
                {focusAreas[2]}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Capability strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { n: '01', title: 'Engineering', desc: 'React, Next.js and TypeScript architectures built to scale with the product.' },
            { n: '02', title: 'UI/UX Design', desc: 'Interfaces rooted in systems thinking, clarity, and real user behaviour.' },
            { n: '03', title: 'Performance', desc: 'Fast delivery, accessible patterns, and resilient offline-first thinking.' },
          ].map((item) => (
            <div
              key={item.n}
              className="premium-card p-6 md:p-7 hover-rise group"
            >
              <span className="text-[10px] font-bold tabular-nums text-accent/60 group-hover:text-accent transition-colors">
                {item.n}
              </span>
              <h3 className="font-bold text-lg mt-2 mb-2 tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
