'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Zustand'] },
  { category: 'Design', items: ['UI/UX Design', 'Figma', 'Prototyping', 'Design Systems', 'Typography', 'Color Theory'] },
  { category: 'Backend/Tools', items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Git', 'Vite', 'Vitest'] },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div>
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-border shadow-xl shrink-0">
              <Image
                src="/Emma.jpeg"
                alt="Emmanuel Okine"
                fill
                className="object-cover object-top"
                sizes="144px"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Engineered for <span className="text-gradient">Impact</span>.
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground font-normal leading-relaxed">
                <p>
                  I&apos;m Emmanuel Okine, a software engineer and designer in Accra, Ghana. I got into this work through a simple frustration: so much of the software that reaches people here is built for fast phones and reliable internet that most users don&apos;t actually have. Closing that gap, between how apps are designed and how they&apos;re really used, is what pulled me in.
                </p>
                <p>
                  Over the past two years that has taken me deep into fintech and logistics: leading frontend architecture on products that move money (iSmartPay), run vehicle fleets (Fleetly), and put bookkeeping in the hands of market traders who have never touched a spreadsheet (Akonta). Different domains, same throughline: high stakes, messy real-world constraints, and users who don&apos;t get a second chance if the software fails them.
                </p>
                <p>
                  The problem I keep coming back to is reliability under pressure: how a screen behaves when the network drops mid-payment, how an interface stays legible for a low-literacy user, how a 15-module codebase stays maintainable as it grows. I like owning problems end to end, from data model to pixel, and I judge design by one thing: how well it works.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-border">
             <div>
                <div className="text-3xl font-bold text-foreground">2+</div>
                <div className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground mt-1">Years Experience</div>
             </div>
             <div>
                <div className="text-3xl font-bold text-foreground">20+</div>
                <div className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground mt-1">Projects Delivered</div>
             </div>
             <div>
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-[10px] uppercase font-bold tracking-tight text-muted-foreground mt-1">Deployment Rate</div>
             </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">How I work</h3>
             <ul className="space-y-4">
               {[
                 { t: 'I own problems end to end.', d: 'From data model to pixel, I take responsibility for the whole slice, not just my ticket.' },
                 { t: 'I design for real constraints.', d: 'Slow networks, budget devices and non-technical users are the default I build against, not the edge case.' },
                 { t: 'I communicate early and often.', d: 'I flag trade-offs and unknowns quickly, so there are no surprises late in a build.' },
               ].map((v) => (
                 <li key={v.t} className="flex items-start gap-3">
                   <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={18} />
                   <p className="text-base text-muted-foreground leading-relaxed">
                     <span className="font-bold text-foreground">{v.t}</span> {v.d}
                   </p>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        <div id="skills" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-lg border border-border bg-muted/10"
            >
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">{skill.category}</h3>
              <ul className="space-y-3">
                {skill.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg border border-accent/20 bg-accent/5 flex flex-col justify-center text-left"
            >
              <p className="text-sm font-bold text-accent mb-4 uppercase tracking-widest">Philosophy</p>
              <h3 className="text-xl font-bold leading-tight">"Design is not just what it looks like and feels like. Design is how it works."</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
