import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #4A5FEE, #2233B8)',
        }}
      >
        <svg width='120' height='120' viewBox='0 0 32 32' fill='none'>
          <path
            d='M5.2 12.5A11.5 11.5 0 0 1 26.8 12.5M26.8 19.5A11.5 11.5 0 0 1 5.2 19.5'
            stroke='#fff'
            strokeWidth='2.6'
            strokeLinecap='round'
          />
          <circle cx='3.6' cy='16' r='1.9' fill='#fff' />
          <circle cx='28.4' cy='16' r='1.9' fill='#fff' />
          <path
            d='M19.2 12.6c-.6-1-1.8-1.6-3.2-1.6-1.9 0-3.2 1-3.2 2.4 0 3.2 6.6 1.8 6.6 5.2 0 1.5-1.4 2.5-3.4 2.5-1.5 0-2.8-.6-3.4-1.8'
            stroke='#fff'
            strokeWidth='2.4'
            strokeLinecap='round'
          />
        </svg>
      </div>
    ),
    size
  );
}
