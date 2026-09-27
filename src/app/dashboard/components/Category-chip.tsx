import Image from 'next/image';

export function CategoryChip({ name, image }: { name: string; image: string }) {
  return (
    <span className='inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white py-1 pl-1.5 pr-3 text-sm font-medium text-ink'>
      <Image
        width={40}
        height={40}
        className='h-6 w-6 object-contain'
        src={image}
        alt=''
      />
      {name}
    </span>
  );
}
