import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  dataScienceProjects,
  getDataScienceProject,
} from '@/data/dataScience';
import { cn } from '@/lib/utils';
import ForecastExplorer from '@/components/data-science/ForecastExplorer';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dataScienceProjects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDataScienceProject(slug);
  if (!project) return { title: 'Case study not found' };
  return {
    title: `${project.title} | Data Science | Emmanuel Okine`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage.endsWith('.svg') ? undefined : [project.coverImage],
    },
  };
}

export default async function DataScienceCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getDataScienceProject(slug);
  if (!project) notFound();

  const index = dataScienceProjects.findIndex((p) => p.id === slug);
  const prev = dataScienceProjects[(index - 1 + dataScienceProjects.length) % dataScienceProjects.length];
  const next = dataScienceProjects[(index + 1) % dataScienceProjects.length];
  const coverIsSvg = project.coverImage.endsWith('.svg');

  const decision = project.keyDecisions[0];
  const metric = project.metrics[0];
  const limitation = project.lessons[0] ?? project.challenges[0];

  const detailSections: { title: string; body: string[] }[] = [
    { title: 'Problem', body: [project.problem] },
    { title: 'Approach', body: project.approach },
    { title: 'Evaluation', body: project.evaluation },
    { title: 'Findings', body: project.findings },
  ];

  return (
    <article className="min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto min-w-0">
        <Link
          href="/data-science"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10 sm:mb-12"
        >
          <ArrowLeft size={16} />
          All case studies
        </Link>

        <header className="mb-10 sm:mb-12 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
              {project.domain}
            </span>
            <span
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.14em] px-1.5 py-0.5 border',
                project.stage.includes('NDA')
                  ? 'border-gold/50 text-gold'
                  : 'border-border text-muted-foreground'
              )}
            >
              {project.stage}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-5 break-words">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4">
            {project.hook}
          </p>
          <p className="text-sm text-muted-foreground/80">{project.role}</p>
          <p className="text-xs text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            {project.stageNote}
          </p>
        </header>

        {/* One screen lock-in: decision, metric, limitation */}
        <section className="mb-12 sm:mb-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border bg-surface p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold mb-3">
              Decision
            </p>
            <h2 className="font-serif text-xl font-medium tracking-tight mb-2 leading-snug">
              {decision.decision}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{decision.reasoning}</p>
          </div>
          <div className="border border-border bg-surface p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold mb-3">
              Metric
            </p>
            <div className="font-serif text-4xl font-medium tracking-tight mb-2">{metric.value}</div>
            <p className="text-sm font-medium mb-1">{metric.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
          </div>
          <div className="border border-border bg-surface p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold mb-3">
              Limitation
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{limitation}</p>
          </div>
        </section>

        {slug === 'book-sales-forecasting' && (
          <div className="mb-12 sm:mb-14">
            <ForecastExplorer />
          </div>
        )}

        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] border border-border bg-surface mb-12 sm:mb-14 overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            priority
            className={coverIsSvg ? 'object-contain p-4 sm:p-8' : 'object-cover object-top'}
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-10 sm:space-y-12 min-w-0">
            {detailSections.map((section, i) => (
              <section key={section.title}>
                <h2 className="font-serif text-2xl font-medium tracking-tight mb-4 flex items-baseline gap-3">
                  <span className="text-xs font-medium tabular-nums text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>
                {section.body.length === 1 ? (
                  <p className="text-base text-muted-foreground leading-relaxed">{section.body[0]}</p>
                ) : (
                  <ul className="space-y-2.5">
                    {section.body.map((item) => (
                      <li key={item} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                        <span className="mt-2.5 h-px w-5 shrink-0 bg-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section>
              <h2 className="font-serif text-2xl font-medium tracking-tight mb-4">
                More decisions
              </h2>
              <div className="space-y-3">
                {project.keyDecisions.slice(1).map((kd, i) => (
                  <div key={kd.decision} className="border border-border p-5">
                    <h3 className="text-base font-semibold mb-1.5">
                      {String(i + 2).padStart(2, '0')}. {kd.decision}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{kd.reasoning}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-medium tracking-tight mb-3">
                Business implication
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-gold pl-5">
                {project.impact}
              </p>
            </section>

            {project.figures && project.figures.length > 0 && (
              <section className="space-y-8">
                <h2 className="font-serif text-2xl font-medium tracking-tight">Figures</h2>
                {project.figures.map((fig) => {
                  const svg = fig.src.endsWith('.svg');
                  return (
                    <figure key={fig.src} className="border border-border bg-surface overflow-hidden">
                      <div className="relative w-full aspect-[16/10]">
                        <Image
                          src={fig.src}
                          alt={fig.alt}
                          fill
                          className={svg ? 'object-contain p-3 sm:p-6' : 'object-contain bg-white'}
                          sizes="(max-width: 900px) 100vw, 700px"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border leading-relaxed">
                        {fig.caption}
                      </figcaption>
                    </figure>
                  );
                })}
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 min-w-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="border border-border bg-surface p-5">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 border border-border bg-background text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-border p-5">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Disclosure
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.stageNote}</p>
              </div>
              {project.metrics.length > 1 && (
                <div className="border border-border p-5 space-y-4">
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Other metrics
                  </h3>
                  {project.metrics.slice(1).map((m) => (
                    <div key={m.label}>
                      <div className="font-serif text-2xl font-medium tracking-tight">{m.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        <nav className="mt-16 sm:mt-20 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/data-science/${prev.id}`}
            className="group border border-border p-5 hover:border-accent transition-colors min-w-0"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <ArrowLeft size={14} /> Previous
            </span>
            <div className="font-serif text-lg font-medium group-hover:text-accent transition-colors break-words">
              {prev.title}
            </div>
          </Link>
          <Link
            href={`/data-science/${next.id}`}
            className="group border border-border p-5 hover:border-accent transition-colors sm:text-right min-w-0"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-2 sm:justify-end">
              Next <ArrowRight size={14} />
            </span>
            <div className="font-serif text-lg font-medium group-hover:text-accent transition-colors break-words">
              {next.title}
            </div>
          </Link>
        </nav>
      </div>
    </article>
  );
}
