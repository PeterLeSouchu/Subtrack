export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 32 32' fill='none' className={className} aria-hidden='true'>
      <path
        d='M5.2 12.5A11.5 11.5 0 0 1 26.8 12.5M26.8 19.5A11.5 11.5 0 0 1 5.2 19.5'
        stroke='currentColor'
        strokeWidth='2.6'
        strokeLinecap='round'
      />
      <circle cx='3.6' cy='16' r='1.9' fill='currentColor' />
      <circle cx='28.4' cy='16' r='1.9' fill='currentColor' />
      <path
        d='M19.2 12.6c-.6-1-1.8-1.6-3.2-1.6-1.9 0-3.2 1-3.2 2.4 0 3.2 6.6 1.8 6.6 5.2 0 1.5-1.4 2.5-3.4 2.5-1.5 0-2.8-.6-3.4-1.8'
        stroke='currentColor'
        strokeWidth='2.4'
        strokeLinecap='round'
      />
    </svg>
  );
}
