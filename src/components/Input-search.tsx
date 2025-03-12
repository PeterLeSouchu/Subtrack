import { SearchIcon } from './icons';

export default function InputSearch() {
  return (
    <div className='flex flex-1 border items-center rounded-full p-1'>
      <input
        id='search'
        placeholder='Cherchez une mensualité'
        type='text'
        className='rounded-full flex-1 outline-none px-3'
      />
      <label htmlFor='search'>
        {' '}
        <SearchIcon width='20' height='20' />
      </label>
    </div>
  );
}
