import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';
import { site, mailto } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-3 mb-4 group">
            <span className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-accent/40 transition-all shrink-0">
              <Image src="/Emma.jpeg" alt="" fill sizes="36px" className="object-cover object-top" />
            </span>
            <span>{site.name}</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Software Engineer &amp; UI/UX Designer building scalable, high-conversion, user-centered digital products.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-6">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={mailto} aria-label="Email" className="text-muted-foreground hover:text-accent transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-muted-foreground text-xs font-medium">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
