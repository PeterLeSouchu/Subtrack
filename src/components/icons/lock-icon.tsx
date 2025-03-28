import { IconProps } from '@/src/types/icon-props';

export function LockIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      viewBox='0 0 65 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.9583 29.7915V18.9582C18.9583 15.3667 20.385 11.9223 22.9246 9.38277C25.4642 6.84321 28.9085 5.4165 32.5 5.4165C36.0915 5.4165 39.5358 6.84321 42.0754 9.38277C44.615 11.9223 46.0417 15.3667 46.0417 18.9582V29.7915M13.5417 29.7915H51.4583C54.4499 29.7915 56.875 32.2166 56.875 35.2082V54.1665C56.875 57.158 54.4499 59.5832 51.4583 59.5832H13.5417C10.5501 59.5832 8.125 57.158 8.125 54.1665V35.2082C8.125 32.2166 10.5501 29.7915 13.5417 29.7915Z'
        stroke='currentColor'
        strokeWidth='6'
      />
    </svg>
  );
}
