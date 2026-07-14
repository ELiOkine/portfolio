import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = 'Emmanuel Okine, Software Engineer & UI/UX Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f3f0ea',
          padding: '70px 80px',
          fontFamily: 'Georgia, serif',
          color: '#141210',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '20px',
            color: '#9a7340',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {site.location}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '88px', fontWeight: 500, letterSpacing: '-3px', lineHeight: 0.95 }}>
            Emmanuel
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '88px',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-3px',
              lineHeight: 0.95,
              color: 'rgba(20,18,16,0.72)',
            }}
          >
            Okine
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              color: '#6a645c',
              marginTop: '28px',
              fontFamily: 'sans-serif',
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '20px',
            color: '#6a645c',
            fontFamily: 'sans-serif',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Fintech · Logistics · Interfaces
        </div>
      </div>
    ),
    { ...size }
  );
}
