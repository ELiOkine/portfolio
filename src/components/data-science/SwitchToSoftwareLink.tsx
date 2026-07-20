'use client';

import Link from 'next/link';
import { useTrack } from '@/components/TrackProvider';

export default function SwitchToSoftwareLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setTrack } = useTrack();

  return (
    <Link
      href="/#projects"
      className={className}
      onClick={() => setTrack('software')}
    >
      {children}
    </Link>
  );
}
