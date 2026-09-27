import Image from 'next/image';

export function CategoryIcon({
  image,
  size = 'md',
}: {
  image: string;
  size?: 'sm' | 'md';
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-inset ring-ink/5 ${
        size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
      }`}
    >
      <Image
        width={40}
        height={40}
        className={`object-contain ${size === 'sm' ? 'h-5 w-5' : 'h-6 w-6'}`}
        src={image}
        alt=''
      />
    </span>
  );
}

export function CategoryChip({ name, image }: { name: string; image: string }) {
  return (
    <span className='inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100/80 py-0.5 pl-1 pr-2.5 text-xs font-medium text-stattext ring-1 ring-inset ring-ink/5'>
      <Image
        width={32}
        height={32}
        className='h-4 w-4 object-contain'
        src={image}
        alt=''
      />
      {name}
    </span>
  );
}
