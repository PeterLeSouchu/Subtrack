import { IconProps } from '@/src/types/icon-props';

export function AlertIcon({ className, width, height }: IconProps) {
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
        d='M24 16V24M24 32H24.02M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
