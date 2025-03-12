import { AddIcon } from './icons';

export default function NewMensualityBtn() {
  return (
    <button
      type='button'
      className='flex gap-3 p-2 bg-navbar items-center transition lg:hover:bg-blue rounded-md font-medium text-white'
    >
      <AddIcon width='20' height='20' />
      <p className='lg:block hidden'> Nouvelle mensualité</p>
    </button>
  );
}
