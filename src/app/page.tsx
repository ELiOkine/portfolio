import Hero from '@/components/home/Hero';
import ProjectGrid from '@/components/home/ProjectGrid';
import About from '@/components/home/About';
import { site, mailto } from '@/lib/site';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProjectGrid />
      <About />

      <section id="contact" className="relative py-28 md:py-40 px-6 border-t border-border overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-4 bottom-0 font-serif italic text-[clamp(5rem,18vw,14rem)] leading-none text-white/[0.06] select-none tracking-[-0.04em]"
        >
          Hello
        </div>
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45 mb-5">
              Contact
            </p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 leading-[1.05]">
              Tell me what you&apos;re building.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-10">
              Open to engineering roles and product design work. I usually reply within a day.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={mailto}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                {site.email}
              </a>
              <a href={site.resume} download className="text-sm font-medium text-white/70 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors">
                Download resume
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-16 space-y-6 text-sm text-white/55">
            <p>
              <span className="block text-white/85 font-medium mb-1">Based in</span>
              Accra (GMT), remote-friendly
            </p>
            <p>
              <span className="block text-white/85 font-medium mb-1">Open to</span>
              Full-time, contract, product &amp; design
            </p>
            <p className="pt-2 flex gap-4">
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/25">
                GitHub
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/25">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
