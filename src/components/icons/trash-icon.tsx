import { IconProps } from '@/src/types/icon-props';

export function TrashIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.08331 12.25C3.76248 12.25 3.48783 12.1358 3.25935 11.9073C3.03088 11.6788 2.91665 11.4042 2.91665 11.0833V3.5H2.33331V2.33333H5.24998V1.75H8.74998V2.33333H11.6666V3.5H11.0833V11.0833C11.0833 11.4042 10.9691 11.6788 10.7406 11.9073C10.5121 12.1358 10.2375 12.25 9.91665 12.25H4.08331ZM9.91665 3.5H4.08331V11.0833H9.91665V3.5ZM5.24998 9.91667H6.41665V4.66667H5.24998V9.91667ZM7.58331 9.91667H8.74998V4.66667H7.58331V9.91667Z'
        fill='#253145'
        fillOpacity='0.6'
      />
    </svg>
  );
}
