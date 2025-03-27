import { IconProps } from '@/src/types/icon-props';

export function LeftIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M30 36L18 24L30 12'
        stroke='#FFFFFF'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
