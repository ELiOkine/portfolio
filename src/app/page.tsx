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

      <section id="contact" className="relative py-20 sm:py-28 md:py-40 px-4 sm:px-6 border-t border-border overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-4 bottom-0 font-serif italic text-[clamp(3.5rem,14vw,14rem)] leading-none text-white/[0.06] select-none tracking-tight"
        >
          Hello
        </div>
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 min-w-0">
          <div className="lg:col-span-8 min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45 mb-5">
              Contact
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 sm:mb-8 leading-[1.05] break-words">
              Tell me what you&apos;re building.
            </h2>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mb-8 sm:mb-10">
              Liked the live systems above? Let&apos;s talk roles, contracts, or a product that needs the same care.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={mailto}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary-foreground text-primary text-sm font-semibold hover:bg-white/90 transition-colors break-all"
              >
                {site.email}
              </a>
              <a
                href={site.resume}
                download
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-white/35 text-primary-foreground text-sm font-semibold hover:bg-white/10 hover:border-white/60 transition-colors"
              >
                See my résumé
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-16 space-y-6 text-sm text-white/55">
            <p>
              <span className="block text-white/85 font-medium mb-1">Based in</span>
              Accra (GMT), remote friendly
            </p>
            <p>
              <span className="block text-white/85 font-medium mb-1">Open to</span>
              Full time, contract, product &amp; design
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
