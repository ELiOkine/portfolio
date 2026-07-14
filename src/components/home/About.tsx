'use client';

import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query'] },
  { category: 'Design', items: ['UI/UX', 'Figma', 'Design systems', 'Prototyping', 'Accessibility'] },
  { category: 'Backend & tools', items: ['Node.js', 'PostgreSQL', 'Supabase', 'SQLite', 'Docker', 'Vitest', 'Sentry'] },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
            About
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-[1.1]">
            Built for how people actually use software.
          </h2>
          <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              I got into this work through a simple frustration: so much of the software that reaches people here is designed for fast phones and reliable internet that most users do not have. Closing that gap is what pulled me in.
            </p>
            <p>
              Over the past two years that has meant leading frontend work on products that move money (iSmartPay), run vehicle fleets (Fleetly), and put bookkeeping in the hands of market traders who have never opened a spreadsheet (Akonta).
            </p>
            <p>
              I come back to the same questions: what happens when the network drops mid-payment, can a low-literacy user finish the task, and will this codebase still make sense when it is fifteen modules deep.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div>
              <div className="font-serif text-3xl font-medium">2+</div>
              <div className="text-xs text-muted-foreground mt-1">Years shipping</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-medium">5+</div>
              <div className="text-xs text-muted-foreground mt-1">Live deployments</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-medium">800k+</div>
              <div className="text-xs text-muted-foreground mt-1">GH₵ processed</div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">
              How I work
            </h3>
            <ul className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <li>
                <span className="text-foreground font-medium">Own the slice.</span>{' '}
                From data model to pixel — not just the ticket.
              </li>
              <li>
                <span className="text-foreground font-medium">Design for constraints first.</span>{' '}
                Slow networks and non-technical users are the default, not the edge case.
              </li>
              <li>
                <span className="text-foreground font-medium">Surface trade-offs early.</span>{' '}
                No surprises late in a build.
              </li>
            </ul>
          </div>
        </div>

        <div id="skills" className="lg:col-span-5 space-y-10">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                {skill.category}
              </h3>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {skill.items.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
