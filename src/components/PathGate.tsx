'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTrack } from '@/components/TrackProvider';
import { cambridgeCredential } from '@/lib/track';

/**
 * Soft start gate: interviewers pick the lane that matches the role.
 * Preference only; both tracks stay available.
 */
export default function PathGate() {
  const { track, ready, setTrack } = useTrack();
  const reduce = useReducedMotion();
  const open = ready && track === null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const choose = (next: 'software' | 'data') => {
    setTrack(next);
    // Stay on home so the portrait hero remains visible for both paths
    const target = next === 'data' ? 'data-science' : 'projects';
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 page-atmosphere"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="path-gate-title"
        >
          <div aria-hidden className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl border border-border bg-surface shadow-[0_24px_80px_-40px_rgba(20,18,16,0.45)] p-6 sm:p-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-4">
              Start here
            </p>
            <h1
              id="path-gate-title"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.08] mb-4"
            >
              What are you hiring for?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
              Pick a lane. You can switch anytime. Both paths are the same person:
              production software and {cambridgeCredential.short} data science work.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => choose('software')}
                className="group text-left border border-border bg-background p-5 sm:p-6 hover:border-accent transition-colors min-w-0"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                  Path A
                </span>
                <span className="mt-3 block font-serif text-xl sm:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors">
                  Software engineering
                </span>
                <span className="mt-2 block text-sm text-muted-foreground leading-relaxed">
                  Live fintech, fleet, and product systems you can click through.
                </span>
              </button>

              <button
                type="button"
                onClick={() => choose('data')}
                className="group text-left border border-border bg-background p-5 sm:p-6 hover:border-accent transition-colors min-w-0"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                  Path B
                </span>
                <span className="mt-3 block font-serif text-xl sm:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors">
                  Data Science &amp; AI
                </span>
                <span className="mt-2 block text-sm text-muted-foreground leading-relaxed">
                  Forecasting, anomalies, NLP. {cambridgeCredential.short} accelerator case studies.
                </span>
              </button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              Credential: {cambridgeCredential.withPartner}. Not a degree. A professional accelerator.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
