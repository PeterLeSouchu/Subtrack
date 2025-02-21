import { IconProps } from '@/src/types/icon-props';

export function BookIcon({ className }: IconProps) {
  return (
    <svg
      className={`w-20 h-20 ${className}`}
      viewBox='0 0 65 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M32.5001 18.9583C32.5001 16.0852 31.3587 13.3297 29.3271 11.298C27.2954 9.26637 24.5399 8.125 21.6667 8.125H5.41675V48.75H24.3751C26.53 48.75 28.5966 49.606 30.1203 51.1298C31.6441 52.6535 32.5001 54.7201 32.5001 56.875M32.5001 18.9583V56.875M32.5001 18.9583C32.5001 16.0852 33.6414 13.3297 35.6731 11.298C37.7047 9.26637 40.4602 8.125 43.3334 8.125H59.5834V48.75H40.6251C38.4702 48.75 36.4036 49.606 34.8798 51.1298C33.3561 52.6535 32.5001 54.7201 32.5001 56.875'
        stroke='currentColor'
        strokeWidth='6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
