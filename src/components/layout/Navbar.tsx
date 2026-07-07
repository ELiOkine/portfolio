'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site, mailto } from '@/lib/site';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-3">
          <span className="w-9 h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold">EO</span>
          <span className="hidden sm:inline-block">Emmanuel Okine</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2" />
          <div className="flex items-center gap-4">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
          <a href={mailto} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:bg-accent transition-colors">
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden flex flex-col p-6 gap-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-6 mt-2">
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><Github size={24} /></a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin size={24} /></a>
              <a href={mailto} aria-label="Email" className="hover:text-accent transition-colors"><Mail size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
