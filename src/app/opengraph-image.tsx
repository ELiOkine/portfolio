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
          background: '#f6f5f1',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
          color: '#121212',
        }}
      >
        <div style={{ display: 'flex', fontSize: '22px', color: '#5a5853', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {site.location}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '72px', fontWeight: 500, letterSpacing: '-2px', lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: '32px', color: '#5a5853', marginTop: '20px', fontFamily: 'sans-serif' }}>
            {site.role}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '22px', color: '#5a5853', fontFamily: 'sans-serif' }}>
          Fintech · Logistics · Product interfaces
        </div>
      </div>
    ),
    { ...size }
  );
}
