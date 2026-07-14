'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site, mailto } from '@/lib/site';

const navLinks = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        scrolled ? 'py-3 border-b border-border bg-background/90 backdrop-blur-md' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-0">
        <Link href="/" className="font-serif text-lg sm:text-xl font-medium tracking-tight hover:text-accent transition-colors shrink-0">
          {site.name}<span className="text-gold">.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 min-w-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={mailto}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href={site.resume}
            download={site.resumeFilename}
            className="inline-flex items-center px-3.5 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-accent transition-colors whitespace-nowrap"
          >
            See my résumé
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <a
            href={site.resume}
            download={site.resumeFilename}
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground whitespace-nowrap"
          >
            See résumé
          </a>
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden flex flex-col p-5 sm:p-6 gap-4 max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={site.resume}
              download={site.resumeFilename}
              className="text-base font-semibold"
              onClick={() => setIsOpen(false)}
            >
              See my résumé
            </a>
            <a href={mailto} className="text-base font-medium text-accent" onClick={() => setIsOpen(false)}>
              {site.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
