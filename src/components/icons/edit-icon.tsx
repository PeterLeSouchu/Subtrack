import { IconProps } from '@/src/types/icon-props';

export function EditIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={` ${className}`}
      width={width}
      height={height}
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.04163 0.91666H4.12496C1.83329 0.91666 0.916626 1.83333 0.916626 4.12499V6.87499C0.916626 9.16666 1.83329 10.0833 4.12496 10.0833H6.87496C9.16663 10.0833 10.0833 9.16666 10.0833 6.87499V5.95833M6.83371 1.90208C7.14079 2.99749 7.99788 3.85458 9.09788 4.16624M7.35163 1.38416L3.73996 4.99583C3.60246 5.13333 3.46496 5.40374 3.43746 5.60083L3.24038 6.98041C3.16704 7.47999 3.51996 7.82833 4.01954 7.75958L5.39913 7.56249C5.59163 7.53499 5.86204 7.39749 6.00413 7.25999L9.61579 3.64833C10.2391 3.02499 10.5325 2.30083 9.61579 1.38416C8.69913 0.467494 7.97496 0.760827 7.35163 1.38416Z'
        stroke='#253145'
        strokeOpacity='0.6'
        strokeWidth='1'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
