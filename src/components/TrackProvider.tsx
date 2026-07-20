'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  TRACK_STORAGE_KEY,
  type PortfolioTrack,
} from '@/lib/track';

type TrackContextValue = {
  track: PortfolioTrack | null;
  ready: boolean;
  setTrack: (track: PortfolioTrack) => void;
  clearTrack: () => void;
};

const TrackContext = createContext<TrackContextValue | null>(null);

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<PortfolioTrack | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TRACK_STORAGE_KEY);
      if (saved === 'software' || saved === 'data') setTrackState(saved);
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const setTrack = useCallback((next: PortfolioTrack) => {
    setTrackState(next);
    try {
      window.localStorage.setItem(TRACK_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const clearTrack = useCallback(() => {
    setTrackState(null);
    try {
      window.localStorage.removeItem(TRACK_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <TrackContext.Provider value={{ track, ready, setTrack, clearTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack() {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error('useTrack must be used within TrackProvider');
  return ctx;
}
