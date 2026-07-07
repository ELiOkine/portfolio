'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Fine grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {site.available && (
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-secondary/60 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </div>
          )}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
            Building functional <br /> 
            software with <span className="text-accent underline decoration-accent/10 underline-offset-8">intent</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Software Engineer &amp; UI/UX Designer building scalable frontend architectures and high-conversion UX for real-world fintech, logistics, and education products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold flex items-center gap-2 hover:bg-black transition-all"
          >
            Selected Projects
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-secondary border border-border rounded-md font-bold hover:bg-muted transition-colors"
          >
            Contact
          </a>
        </motion.div>

        {/* Technical Proof Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60"
        >
          <span className="w-8 h-[1px] bg-border" />
          Featured: <a href="/projects/fleet-management-dashboard" className="text-accent/80 hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20">Fleetly — Fleet Management Platform</a>
          <span className="w-8 h-[1px] bg-border" />
        </motion.div>

        {/* Normal Grid Icons */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Code, title: 'Engineering', desc: 'Scalable architectures built with React, Next.js, and TypeScript.' },
            { icon: Palette, title: 'UI/UX Design', desc: 'Functional interfaces rooted in systems thinking and user behavior.' },
            { icon: Zap, title: 'Performance', desc: 'Optimized delivery with a focus on speed and accessibility.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
              className="p-8 rounded-lg border border-border text-left bg-background"
            >
              <item.icon className="text-accent mb-4" size={24} />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
