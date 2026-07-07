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
      <section id="contact" className="py-32 px-6 text-center border-t border-border bg-background">
        <div className="max-w-3xl mx-auto">
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
            Let&apos;s build functional <br /> systems together.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 font-normal leading-relaxed">
            Open to engineering roles and product/design projects. Reach out and let&apos;s talk about what you&apos;re building.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={mailto} className="px-8 py-4 bg-accent text-white rounded-md font-bold text-base hover:bg-emerald-600 transition-colors">
              Get in touch
            </a>
            <a href={site.resume} download className="text-base font-bold hover:text-accent transition-colors underline underline-offset-4 decoration-accent/20">
              Download Resume
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground font-medium">{site.email}</p>
        </div>
      </section>
    </div>
  );
}
