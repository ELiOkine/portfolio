'use client';

import { motion } from 'framer-motion';

const skills = [
 { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java'] },
 { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Zustand', 'React Query'] },
 { category: 'Data & AI', items: ['scikit-learn', 'XGBoost', 'Prophet', 'TensorFlow', 'BERTopic', 'Chronos-2'] },
 { category: 'Design', items: ['UI/UX', 'Figma', 'Design systems', 'Prototyping', 'Accessibility'] },
 { category: 'Backend & tools', items: ['Node.js', 'PostgreSQL', 'Supabase', 'SQLite', 'Docker', 'Vitest', 'Sentry'] },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
 return (
 <section id="about" className="relative py-28 md:py-36 px-6 border-t border-border page-atmosphere overflow-hidden">
 <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
 <div className="lg:col-span-7">
 <motion.p
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-5"
 >
 About
 </motion.p>
 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease }}
 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-10 leading-[1.05]"
 >
 Built for how people{' '}
 <span className="italic text-foreground/70">actually</span> use software.
 </motion.h2>
 <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
 <p>
 I got into this work through a simple frustration: so much of the software that reaches people here is designed for fast phones and reliable internet that most users do not have. Closing that gap is what pulled me in.
 </p>
            <p>
              Over the past two years that has meant leading frontend work on products that move money (iSmartPay), run vehicle fleets (Fleetly), and put bookkeeping in the hands of market traders who have never opened a spreadsheet (Akonta).
            </p>
            <p>
              Separately, through the University of Cambridge Data Science for Business Career Accelerator, I worked on forecasting, anomaly detection, and NLP under real client constraints and NDA rules.
            </p>
 <p>
 I come back to the same questions: what happens when the network drops mid payment, can a low literacy user finish the task, and will this codebase still make sense fifteen modules deep.
 </p>
 </div>

 <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 pt-10 border-t border-border">
 {[
 { v: '2+', l: 'Years shipping' },
 { v: '5+', l: 'Live deployments' },
 { v: '800k+', l: 'GH₵ processed' },
 ].map((stat, i) => (
 <motion.div
 key={stat.l}
 initial={{ opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.1 + i * 0.08, duration: 0.45, ease }}
 className="min-w-0"
 >
 <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">{stat.v}</div>
 <div className="text-[10px] sm:text-xs text-muted-foreground mt-2 tracking-wide leading-snug">{stat.l}</div>
 </motion.div>
 ))}
 </div>

 <div className="mt-14 pt-10 border-t border-border max-w-xl">
 <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground mb-6">
 How I work
 </h3>
 <ul className="space-y-5">
 {[
 { t: 'Own the slice.', d: 'From data model to pixel, not just the ticket.' },
 { t: 'Constraints first.', d: 'Slow networks and non technical users are the default.' },
 { t: 'Trade offs early.', d: 'No surprises late in a build.' },
 ].map((item) => (
 <li key={item.t} className="flex gap-4 text-base leading-relaxed">
 <span className="mt-2 h-px w-6 shrink-0 bg-gold" />
 <p className="text-muted-foreground">
 <span className="text-foreground font-medium">{item.t}</span> {item.d}
 </p>
 </li>
 ))}
 </ul>
 </div>
 </div>

 <div id="skills" className="lg:col-span-5 lg:pt-16">
 <div className="lg:sticky lg:top-28 space-y-0 border-t border-border">
 {skills.map((skill, i) => (
 <motion.div
 key={skill.category}
 initial={{ opacity: 0, x: 12 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: i * 0.06, ease }}
 className="py-7 border-b border-border group"
 >
 <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-3 group-hover:tracking-[0.28em] transition-all duration-500">
 {skill.category}
 </h3>
 <p className="text-base md:text-lg text-foreground leading-relaxed font-serif font-medium">
 {skill.items.join(' · ')}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}
