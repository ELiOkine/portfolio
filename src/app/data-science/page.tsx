import type { Metadata } from 'next';
import Image from 'next/image';
import { dataScienceProjects } from '@/data/dataScience';
import { CaseStudyCard } from '@/components/data-science/CaseStudyCard';
import SwitchToSoftwareLink from '@/components/data-science/SwitchToSoftwareLink';
import { site } from '@/lib/site';
import { cambridgeCredential } from '@/lib/track';

export const metadata: Metadata = {
  title: 'Data Science & AI Case Studies | Emmanuel Okine',
  description:
    'Forecasting, anomaly detection, and NLP case studies from the University of Cambridge Data Science for Business Career Accelerator: methods, evaluation, and NDA safe findings.',
  openGraph: {
    title: 'Data Science & AI Case Studies | Emmanuel Okine',
    description:
      'Case studies in intermittent demand forecasting, hybrid time series, unsupervised anomaly detection, and neural topic modelling.',
  },
};

const capabilities = [
  'Classical & hybrid forecasting',
  'Foundation models for time series',
  'Unsupervised anomaly detection',
  'Neural topic modelling & NLP',
  'Honest baseline comparison',
  'NDA aware client delivery',
];

export default function DataScienceIndexPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 page-atmosphere">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end mb-12 sm:mb-16">
          <div className="md:col-span-8 min-w-0 order-2 md:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold mb-4">
              Data Science &amp; AI
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] max-w-4xl mb-6">
              Evidence over accuracy theater.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-4">
              Work from the {cambridgeCredential.full}. Each piece is a case study: problem,
              decisions under uncertainty, evaluation, and limitations.
            </p>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Where a project is covered by NDA, the client is anonymized and proprietary data
              is not published. Methodology and permitted metrics remain. This is a professional
              accelerator affiliated with the University of Cambridge, not a Cambridge degree.
            </p>
          </div>
          <div className="md:col-span-4 order-1 md:order-2">
            <div className="media-frame relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-none mx-auto aspect-[4/5] overflow-hidden">
              <Image
                src="/Emma.jpeg"
                alt={site.name}
                fill
                priority
                sizes="(max-width: 768px) 220px, 280px"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/55 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 mb-0.5">
                  {site.name}
                </p>
                <p className="text-xs font-medium text-white">{site.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-14 sm:mb-16">
          {capabilities.map((c) => (
            <span
              key={c}
              className="text-xs font-medium px-3 py-1.5 border border-border text-muted-foreground bg-surface"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 mb-16">
          {dataScienceProjects.map((project, index) => (
            <CaseStudyCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="border-t border-border pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Looking for software development instead?
          </p>
          <SwitchToSoftwareLink className="text-sm font-semibold hover:text-accent transition-colors">
            See software projects →
          </SwitchToSoftwareLink>
        </div>
      </div>
    </div>
  );
}
