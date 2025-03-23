import { IconProps } from '@/src/types/icon-props';

export function MenuMobileIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z' fill='white' />
    </svg>
  );
}
