import { SearchIcon } from './icons';

export default function InputSearch() {
  return (
    <div className='flex flex-1 border items-center rounded-full  w-full  p-1'>
      <input
        id='search'
        placeholder='Cherchez une mensualité'
        type='text'
        className='rounded-full flex-1 outline-none px-3 w-full min-w-[120px]'
      />
      <label htmlFor='search'>
        {' '}
        <SearchIcon width='20' height='20' />
      </label>
    </div>
  );
}

// import { SearchIcon } from './icons';

// export default function InputSearch() {
//   return (
//     <div className='flex items-center border rounded-full p-1 w-full'>
//       <input
//         id='search'
//         placeholder='Cherchez une mensualité'
//         type='text'
//         className='rounded-full outline-none px-3 w-full min-w-[120px]' // Utilisation de w-full pour permettre à l'input de se redimensionner
//       />
//       <label htmlFor='search'>
//         <SearchIcon width='20' height='20' />
//       </label>
//     </div>
//   );
// }
