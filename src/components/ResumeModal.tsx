'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { site } from '@/lib/site';

interface ResumeModalContextType {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = () => setIsOpen(true);
  const closeResume = () => setIsOpen(false);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResume, closeResume }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeResume}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl h-[88vh] bg-background border border-border shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-border bg-muted/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-gold/10 text-gold rounded-sm hidden sm:block">
                    <FileText size={18} />
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
                      {site.name} — Résumé
                    </h3>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                      {site.role} · {site.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <a
                    href={site.resume}
                    download={site.resumeFilename}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground hover:bg-accent transition-colors"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">Download PDF</span>
                  </a>
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    title="Open in new tab"
                  >
                    <ExternalLink size={13} />
                    <span className="hidden sm:inline">New tab</span>
                  </a>
                  <button
                    onClick={closeResume}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close resume preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Preview Body */}
              <div className="flex-1 bg-neutral-900 relative overflow-hidden">
                <iframe
                  src={`${site.resume}#toolbar=0&navpanes=0`}
                  title={`${site.name} Résumé`}
                  className="w-full h-full border-none"
                />
              </div>

              {/* Footer Note */}
              <div className="px-4 py-2 bg-muted/60 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>PDF Document ({site.resumeFilename})</span>
                <button
                  onClick={closeResume}
                  className="hover:text-foreground transition-colors underline"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) {
    throw new Error('useResumeModal must be used within a ResumeProvider');
  }
  return ctx;
}
