import Link from 'next/link';
import { site, mailto } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <Link href="/" className="font-serif text-lg font-medium tracking-tight">
            {site.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            {site.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href={mailto} className="hover:text-foreground transition-colors">
            Email
          </a>
          <span className="text-xs">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
