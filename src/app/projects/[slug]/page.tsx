'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, ChevronRight, Globe, Monitor, Code2, Smartphone } from 'lucide-react';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function ProjectPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'preview' | 'live'>('preview');
  
  const currentIndex = projects.findIndex(p => p.id === slug);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button onClick={() => router.push('/')} className="text-accent underline">Back to Home</button>
        </div>
      </div>
    );
  }

  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const [patchedHtml, setPatchedHtml] = useState<string | null>(null);

  useEffect(() => {
    const link = project.link;
    // Builds that already ship a correct sub-path asset base + their own demo bootstrap
    // are loaded directly; no runtime HTML patching needed.
    if (project.directEmbed) {
      setPatchedHtml(null);
      return;
    }
    if (viewMode === 'live' && link) {
      // Fetch and patch the index.html for the project to handle sub-paths
      fetch(link)
        .then(res => {
          if (!res.ok) throw new Error("Preview fetch failed");
          return res.text();
        })
        .then(html => {
          // Determine the exact base directory path for assets
          const basePath = link.substring(0, link.lastIndexOf('/') + 1);
          
          // 1. Make asset paths absolute relative to the project folder
          let patched = html.replace(/(src|href)="assets\//g, `$1="${basePath}assets/`);
          patched = patched.replace(/(src|href)="\.\/assets\//g, `$1="${basePath}assets/`);
          patched = patched.replace(/(src|href)="\/assets\//g, `$1="${basePath}assets/`);
          
          // 2. Inject a script to fix internal React Router paths
          const routingFix = `
            <script>
              // Trick React Router into thinking it's at the root path
              // but don't navigate so assets still work
              if (window.location.pathname !== '/') {
                window.history.replaceState(null, '', '/');
              }
              
              // Store original fetch
              const originalFetch = window.fetch;
              
              // Simulation layer for API calls
              window.fetch = (url, options) => {
                // Let Vite assets and static chunks load normally!
                if (typeof url === 'string' && (url.includes('assets/') || url.endsWith('.svg') || url.endsWith('.json'))) {
                  return originalFetch(url, options);
                }
                
                console.log('[Simulated Success] Intercepted call to:', url);
                return Promise.resolve(new Response(JSON.stringify({ 
                  success: true, 
                  status: 'success',
                  data: [],
                  message: 'Simulated successful operation' 
                }), { 
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                }));
              };
            </script>
          `;
          
          patched = patched.replace('<head>', `<head>${routingFix}`);
          setPatchedHtml(patched);
        })
        .catch(err => {
          console.error('Failed to patch live preview:', err);
          setPatchedHtml(null); // Fallback to direct src if patch fails
        });
    } else {
      setPatchedHtml(null);
    }
  }, [viewMode, project.link]);

  return (
    <article className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-bold mb-12"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        {/* Header Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              <span className={cn(
                "flex items-center gap-1.5 px-2 py-0.5 border text-[10px] font-bold uppercase tracking-tight rounded-sm",
                project.stage === 'Production' ? "border-accent/40 text-accent" : "border-border text-muted-foreground"
              )}>
                {project.stage === 'Production' && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {project.stage}
              </span>
              <span className="px-2 py-0.5 border border-accent/30 text-accent text-[10px] font-bold uppercase tracking-tight rounded-sm">
                {project.category}
              </span>
              {project.techStack.map(tech => (
                <span key={tech} className="px-2 py-0.5 border border-border text-[10px] font-bold uppercase tracking-tight text-muted-foreground rounded-sm">
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl">
              {project.description}
            </p>
            {project.stageNote && (
              <p className="mt-6 text-sm text-muted-foreground/80 leading-relaxed max-w-3xl border-l-2 border-accent/30 pl-4">
                {project.stageNote}
              </p>
            )}
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.1 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-border"
          >
             <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">Role</h3>
                <p className="text-xl font-bold">{project.role}</p>
             </div>
             <div className="flex flex-wrap gap-4 md:justify-end">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-emerald-600 transition-colors">
                    Visit Live Product <ExternalLink size={16} />
                  </a>
                )}
                {project.link && (
                  <button onClick={() => {
                     setViewMode('live');
                     document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' });
                  }} className={cn(
                    "flex items-center gap-2 px-6 py-3 font-bold rounded-md transition-colors",
                    project.liveUrl ? "bg-secondary border border-border hover:bg-muted" : "bg-accent text-white hover:bg-emerald-600"
                  )}>
                    Interactive Preview <ExternalLink size={16} />
                  </button>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-secondary border border-border font-bold rounded-md hover:bg-muted transition-colors">
                    View Code <Github size={16} />
                  </a>
                )}
             </div>
          </motion.div>

          {project.clients && project.clients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-5">
                {project.clients.length > 1 ? 'Built for / Deployed at' : 'Built for'}
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {project.clients.map(client => (
                  <span key={client} className="text-lg md:text-xl font-bold tracking-tight text-muted-foreground/70">
                    {client}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Project Experience Section */}
        <section id="preview-section" className="mb-32 scroll-mt-32">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent">Visual Experience</h3>
            {project.link && (
              <div className="flex p-1 bg-muted rounded-md border border-border">
                <button 
                  onClick={() => setViewMode('preview')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all",
                    viewMode === 'preview' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Monitor size={14} /> Preview
                </button>
                <button 
                  onClick={() => setViewMode('live')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all",
                    viewMode === 'live' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {project.appetizeKey ? <><Smartphone size={14} /> Real App</> : <><Globe size={14} /> Live System</>}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border overflow-hidden bg-muted/10 shadow-2xl">
            {/* Browser-like chrome header (sits above the content, never covers it) */}
            <div className="h-11 bg-muted/80 backdrop-blur-md border-b border-border flex items-center px-4 gap-3">
               <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
               </div>
               <div className="flex-1 max-w-md mx-auto h-6 bg-background/50 rounded flex items-center px-3 gap-2 min-w-0">
                  <Globe size={10} className="text-muted-foreground shrink-0" />
                  <span className="text-[10px] text-muted-foreground truncate">
                    {viewMode === 'live'
                      ? (project.appetizeKey ? 'Real app running on a cloud Android device' : (project.link || `${project.id} live`))
                      : `${project.id} visual preview`}
                  </span>
               </div>
               {project.link && (
                 <a
                   href={project.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight text-muted-foreground hover:text-accent transition-colors shrink-0"
                 >
                   Open <ExternalLink size={12} />
                 </a>
               )}
            </div>

            {/* Content area, tall for the live demo so the app shows fully */}
            <div
              className={cn(
                "relative bg-white overflow-hidden",
                viewMode === 'live' ? "h-[80vh] min-h-[560px]" : "aspect-video"
              )}
            >
              <AnimatePresence mode="wait">
                {viewMode === 'preview' ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-white"
                  >
                    {project.appetizeKey ? (
                      <iframe
                        src={`https://appetize.io/embed/${project.appetizeKey}?device=pixel7&osVersion=13.0&scale=auto&autoplay=false&screenOnly=false&deviceColor=black`}
                        className="w-full h-full border-none bg-neutral-100"
                        title={`${project.title} Real App`}
                        allow="microphone; camera"
                      />
                    ) : (
                      <iframe
                        src={!patchedHtml ? project.link : undefined}
                        srcDoc={patchedHtml || undefined}
                        className="w-full h-full border-none"
                        title={`${project.title} Live Preview`}
                        allow="microphone; camera"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {viewMode === 'live' && (
            <p className="mt-3 text-xs text-muted-foreground/70 text-center">
              {project.appetizeKey ? (
                <>
                  Tap the screen to launch the real app on a cloud device (takes a few seconds to boot).{' '}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                      Prefer a quick preview? Open the demo ↗
                    </a>
                  )}
                </>
              ) : (
                <>
                  Interactive demo running on sample data.{' '}
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                    Open full screen ↗
                  </a>
                </>
              )}
            </p>
          )}
        </section>

        {/* Impact Cards (KPIs) */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="mb-32">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-8">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-8 rounded-lg border border-border bg-muted/5 group hover:border-accent/30 transition-colors"
                >
                  <div className="text-4xl font-bold tracking-tight mb-2 text-foreground group-hover:text-accent transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold uppercase tracking-tight mb-4 text-muted-foreground">{metric.label}</div>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed font-normal">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-baseline gap-3">
                <span className="text-accent text-sm font-bold tabular-nums">01.</span>
                Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-muted-foreground font-normal leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-baseline gap-3">
                <span className="text-accent text-sm font-bold tabular-nums">02.</span>
                Core Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map(feature => (
                  <div key={feature} className="p-6 rounded-md border border-border flex items-start gap-4 bg-muted/5 group hover:bg-muted/10 transition-colors">
                    <CheckCircle2 className="text-accent/40 mt-1 shrink-0 group-hover:text-accent transition-colors" size={18} />
                    <span className="text-base font-medium text-muted-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-baseline gap-3">
                <span className="text-accent text-sm font-bold tabular-nums">03.</span>
                Technical Challenges
              </h2>
              <div className="space-y-6">
                {project.challenges.map(challenge => (
                  <div key={challenge} className="p-8 rounded-md border border-border border-l-4 border-l-accent bg-background shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-4 items-start">
                      <Code2 size={24} className="text-accent/20 mt-1" />
                      <p className="text-lg font-normal leading-relaxed text-foreground">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* System Architecture Section */}
            {project.architecture && project.architecture.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-baseline gap-3">
                  <span className="text-accent text-sm font-bold tabular-nums">04.</span>
                  System Architecture
                </h2>
                <div className="space-y-8">
                  {project.architecture.map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center font-bold text-xs shrink-0 bg-muted/5 group-hover:border-accent/40 group-hover:text-accent transition-all">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed pt-2">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-12">
            <div className="p-8 rounded-xl border border-border bg-background sticky top-32 shadow-xl">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">Key Outcome</h3>
              <p className="text-xl font-bold leading-tight mb-12">
                {project.impact || 'Functional excellence meeting operational requirements.'}
              </p>
              
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 bg-muted border border-border rounded-sm text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-border flex justify-between items-center">
           <button 
             onClick={() => router.push(`/projects/${prevProject.id}`)}
             className="text-sm font-bold hover:text-accent transition-colors uppercase tracking-widest flex items-center gap-2 group"
           >
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Previous
           </button>
           <button 
             onClick={() => router.push(`/projects/${nextProject.id}`)}
             className="text-sm font-bold hover:text-accent transition-colors uppercase tracking-widest flex items-center gap-2 group"
           >
             Next Project <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </article>
  );
}
