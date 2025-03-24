import { IconProps } from '@/src/types/icon-props';

export function DownIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 48 48'
      fill=' none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M46 36L27 17L17 27L2 12M46 36H34M46 36V24'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
