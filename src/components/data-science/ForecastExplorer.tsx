'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type TitleKey = 'A' | 'B';

const MODELS = [
  { id: 'sarima', name: 'SARIMA', a: 21.5, b: 22.6 },
  { id: 'xgb', name: 'XGBoost', a: 30.5, b: 26.8 },
  { id: 'lstm', name: 'LSTM', a: 49.6, b: 22.0 },
  { id: 'hybrid', name: 'Parallel hybrid', a: 22.8, b: 18.0 },
] as const;

/**
 * Interactive MAPE explorer for the book sales forecasting case study.
 * Public evaluation numbers only. No proprietary series.
 */
export default function ForecastExplorer() {
  const [title, setTitle] = useState<TitleKey>('B');

  const rows = useMemo(
    () =>
      MODELS.map((m) => ({
        ...m,
        mape: title === 'A' ? m.a : m.b,
      })).sort((x, y) => x.mape - y.mape),
    [title],
  );

  const best = rows[0];
  const max = Math.max(...rows.map((r) => r.mape), 55);

  return (
    <div className="border border-border bg-surface overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-border">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gold mb-1">
            Try it
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
            Forecast MAPE explorer
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            32 week holdout. Lower is better. Toggle a title to see which model wins.
          </p>
        </div>
        <div
          className="flex border border-border text-xs font-semibold uppercase tracking-[0.12em] shrink-0"
          role="group"
          aria-label="Book title"
        >
          <button
            type="button"
            onClick={() => setTitle('A')}
            className={cn(
              'px-3 py-2 transition-colors',
              title === 'A' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Title A
          </button>
          <button
            type="button"
            onClick={() => setTitle('B')}
            className={cn(
              'px-3 py-2 border-l border-border transition-colors',
              title === 'B' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Title B
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {rows.map((row) => {
          const width = `${(row.mape / max) * 100}%`;
          const isBest = row.id === best.id;
          return (
            <div key={row.id}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className={cn('text-sm font-medium', isBest && 'text-accent')}>
                  {row.name}
                  {isBest ? ' · best' : ''}
                </span>
                <span className="text-sm tabular-nums text-muted-foreground">{row.mape.toFixed(1)}%</span>
              </div>
              <div className="h-2.5 bg-muted overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-500', isBest ? 'bg-accent' : 'bg-gold/70')}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 sm:px-6 py-4 border-t border-border bg-background/60">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">Decision: </span>
          Prefer the parallel hybrid when it beats both parents on the same fold.
          <span className="text-foreground font-medium"> Metric: </span>
          Best here is {best.name} at {best.mape.toFixed(1)}% MAPE on Title {title}.
          <span className="text-foreground font-medium"> Limit: </span>
          Small active title set. Grain and title choice change the winner.
        </p>
      </div>
    </div>
  );
}
