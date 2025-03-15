import { SearchIcon } from './icons';

export default function InputSearch() {
  return (
    <div className='flex flex-1 bg-white border items-center rounded-full  w-full  p-1'>
      <input
        id='search'
        placeholder='Cherchez une mensualité'
        type='text'
        className='rounded-full bg-transparent flex-1 outline-none px-3 w-full min-w-[120px]'
      />
      <label htmlFor='search'>
        {' '}
        <SearchIcon width='20' height='20' />
      </label>
    </div>
  );
}
