import { IconProps } from '@/src/types/icon-props';

export function ChartIcon({ className }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      viewBox='0 0 65 65'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M32.5 54.1668V27.0835M48.75 54.1668V10.8335M16.25 54.1668V43.3335'
        stroke='currentColor'
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
