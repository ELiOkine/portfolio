'use client';

import { motion } from 'framer-motion';
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Engineered for <span className="text-accent underline decoration-accent/10 underline-offset-4">Impact</span>.
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground font-normal leading-relaxed">
            <p>
              I&apos;m Emmanuel Okine, a software engineer and designer based in Accra, Ghana. Over the past two years I&apos;ve shipped production software across fintech, logistics, and education, leading frontend architecture on real products that move money, track fleets, and serve real users.
            </p>
            <p>
              I care about systems thinking, clean technical foundations, and design that&apos;s judged by how well it works. I like owning problems end to end, from data model to pixel, and turning complex requirements into interfaces people actually understand.
            </p>
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
