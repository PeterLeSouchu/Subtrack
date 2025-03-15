import { AddIcon } from './icons';

export default function NewMensualityBtn() {
  return (
    <button
      type='button'
      className='flex gap-3 p-2 lg:w-auto lg:h-auto  w-10 h-10 justify-center bg-navbar items-center transition lg:hover:bg-blue rounded-full lg:rounded-md font-bold text-white'
    >
      <AddIcon width='16' height='16' />
      <p className='lg:block hidden'> Nouvelle mensualité</p>
    </button>
  );
}
