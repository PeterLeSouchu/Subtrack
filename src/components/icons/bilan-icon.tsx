import { IconProps } from '@/src/types/icon-props';

export function BilanIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.54995 11.05L5.27686 8.50005L7.22466 10.3215L11.5098 6.31437M8.59443 5.95001H11.9V9.04103M3.39995 15.3C2.46107 15.3 1.69995 14.5389 1.69995 13.6V3.40001C1.69995 2.46113 2.46107 1.70001 3.39995 1.70001H13.5999C14.5388 1.70001 15.2999 2.46113 15.2999 3.40001V13.6C15.2999 14.5389 14.5388 15.3 13.5999 15.3H3.39995Z'
        stroke='white'
        strokeWidth='2'
      />
    </svg>
  );
}
