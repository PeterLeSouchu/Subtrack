import { IconProps } from '@/src/types/icon-props';

export function UpIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 52 52'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M49.8334 13L29.2501 33.5833L18.4167 22.75L2.16675 39M49.8334 13H36.8334M49.8334 13V26'
        stroke='currentColor'
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
