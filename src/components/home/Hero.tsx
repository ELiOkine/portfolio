'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { site } from '@/lib/site';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const first = site.name.split(' ')[0];
  const last = site.name.split(' ').slice(1).join(' ');
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-stretch overflow-hidden page-atmosphere grain">
      <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-12 md:pb-16 relative z-10 flex flex-col justify-end min-h-[100svh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end flex-1">
          {/* Portrait, dominant visual */}
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.1, ease }}
            className="lg:col-span-5 order-1 lg:order-2 self-stretch flex"
          >
            <div className="media-frame relative w-full max-w-md mx-auto lg:max-w-none min-h-[52vh] lg:min-h-0 aspect-[4/5] lg:aspect-auto lg:h-full">
              <motion.div
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease }}
                className="absolute inset-0"
              >
                <Image
                  src="/Emma.jpeg"
                  alt="Emmanuel Okine"
                  fill
                  priority
                  sizes="(max-width: 1024px) 420px, 480px"
                  className="object-cover object-top"
                />
              </motion.div>
              {/* Bottom caption bar, part of frame, not floating sticker */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
                  Accra · {site.available ? 'Open to work' : 'Engineer'}
                </p>
                <p className="text-sm font-medium text-white">{site.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Typographic composition */}
          <div className="lg:col-span-7 order-2 lg:order-1 pb-2 lg:pb-6">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-6 md:mb-8"
            >
              Software engineer &amp; designer
            </motion.p>

            <h1 className="font-serif font-medium tracking-[-0.04em] leading-[0.9] mb-8">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                className="block text-[clamp(3.5rem,12vw,8.5rem)] text-foreground"
              >
                {first}
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease }}
                className="block text-[clamp(3.5rem,12vw,8.5rem)] text-foreground/80 italic font-[450]"
              >
                {last}
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10"
            >
              Payment flows, fleet dashboards, and product interfaces built for real devices and unreliable networks, with live systems you can try right here.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62, ease }}
              className="flex flex-wrap items-center gap-5"
            >
              <a href="#projects" className="btn-ink">
                Explore live work
              </a>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium link-quiet">
                Get in touch
                <ArrowDownRight size={16} strokeWidth={1.75} />
              </a>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-14 md:mt-20 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span className="h-px w-10 bg-gold/60 shrink-0" />
              <span>Fintech</span>
              <span className="text-border">/</span>
              <span>Logistics</span>
              <span className="text-border">/</span>
              <span>Interactive demos</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
