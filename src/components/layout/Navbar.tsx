'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        scrolled ? 'py-3 border-b border-border/80 bg-white/85 backdrop-blur-xl shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-3 group">
          <span className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-accent/40 transition-all shrink-0">
            <Image
              src="/Emma.jpeg"
              alt=""
              fill
              sizes="36px"
              className="object-cover object-top"
            />
          </span>
          <span className="hidden sm:inline-block">{site.name}</span>
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
          <a href={mailto} className="px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-bold shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 transition-all">
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
