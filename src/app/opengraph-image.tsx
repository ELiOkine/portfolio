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
          background: '#0a0d0c',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(16,185,129,0.20), transparent 45%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 700,
              color: '#0a0d0c',
            }}
          >
            EO
          </div>
          <div style={{ display: 'flex', fontSize: '26px', color: '#a1a1aa' }}>
            {site.location}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '84px', fontWeight: 700, letterSpacing: '-3px' }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: '40px', color: '#10b981', marginTop: '12px', fontWeight: 600 }}>
            {site.role}
          </div>
          <div style={{ display: 'flex', fontSize: '28px', color: '#a1a1aa', marginTop: '24px', maxWidth: '900px' }}>
            Functional, high-impact products across fintech, logistics & education.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(16,185,129,0.4)',
              color: '#10b981',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '999px', background: '#10b981' }} />
            Available for work
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
