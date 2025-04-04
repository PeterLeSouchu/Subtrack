import { IconProps } from '@/src/types/icon-props';

export function ProfileIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 50 50'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M41.6666 43.75V39.5833C41.6666 37.3732 40.7886 35.2536 39.2258 33.6908C37.663 32.128 35.5434 31.25 33.3333 31.25H16.6666C14.4564 31.25 12.3368 32.128 10.774 33.6908C9.21123 35.2536 8.33325 37.3732 8.33325 39.5833V43.75M33.3333 14.5833C33.3333 19.1857 29.6023 22.9167 24.9999 22.9167C20.3975 22.9167 16.6666 19.1857 16.6666 14.5833C16.6666 9.98096 20.3975 6.25 24.9999 6.25C29.6023 6.25 33.3333 9.98096 33.3333 14.5833Z'
        stroke='currentColor'
        strokeWidth='4'
      />
    </svg>
  );
}
