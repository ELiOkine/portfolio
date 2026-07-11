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

      {/* Contact CTA Section */}
      <section id="contact" className="py-32 px-6 text-center border-t border-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh opacity-60 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          {site.available && (
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new projects
            </div>
          )}
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Let&apos;s build something <br /> that <span className="text-gradient">works</span>.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 font-normal leading-relaxed">
            Open to engineering roles and product/design projects. Tell me what you&apos;re building and I&apos;ll tell you how I&apos;d approach it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={mailto} className="px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-base shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
              Let&apos;s work together
            </a>
            <a href={site.resume} download className="text-base font-bold link-underline hover:text-accent transition-colors">
              Download Resume
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Usually replies within a day
            </span>
            <span className="hidden sm:inline text-border">|</span>
            <span>Full-time, contract &amp; product/design work</span>
            <span className="hidden sm:inline text-border">|</span>
            <span>Accra (GMT), working with teams anywhere</span>
          </div>
          <p className="mt-6 text-sm text-muted-foreground font-medium">{site.email}</p>
        </div>
      </section>
    </div>
  );
}
