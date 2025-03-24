import { IconProps } from '@/src/types/icon-props';

export function DashboardIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 140 140'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_542_17905)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 0C4.47715 0 0 4.47715 0 10V70C0 75.5229 4.47715 80 10 80H50C55.5229 80 60 75.5229 60 70V10C60 4.47715 55.5229 0 50 0H10ZM80 10C80 4.47715 84.4771 0 90 0H130C135.523 0 140 4.47715 140 10V30.1C140 35.6228 135.523 40.1 130 40.1H90C84.4771 40.1 80 35.6228 80 30.1V10ZM80 70C80 64.4772 84.4771 60 90 60H130C135.523 60 140 64.4772 140 70V130C140 135.523 135.523 140 130 140H90C84.4772 140 80 135.523 80 130V70ZM0 109.9C0 104.377 4.47715 99.8999 10 99.8999H50C55.5229 99.8999 60 104.377 60 109.9V130C60 135.523 55.5229 140 50 140H10C4.47715 140 0 135.523 0 130V109.9Z'
        />
      </g>
      <defs>
        <clipPath id='clip0_542_17905'>
          <rect width='140' height='140' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
