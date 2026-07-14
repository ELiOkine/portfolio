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

      <section id="contact" className="py-24 md:py-32 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Contact
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
              Tell me what you&apos;re building.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              Open to engineering roles and product design work. I usually reply within a day.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={mailto}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold hover:bg-accent transition-colors"
              >
                {site.email}
              </a>
              <a href={site.resume} download className="text-sm font-medium link-quiet">
                Download resume
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-12 space-y-4 text-sm text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">Based in</span> Accra (GMT), working with remote teams
            </p>
            <p>
              <span className="text-foreground font-medium">Open to</span> full-time, contract, and product/design projects
            </p>
            <p>
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link-quiet">
                GitHub
              </a>
              {' · '}
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-quiet">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
