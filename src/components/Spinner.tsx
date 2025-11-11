export default function Spinner({ color }: { color?: string }) {
  return (
    <div className='flex items-center w-full h-full justify-center '>
      <div
        className={`w-8 h-8 border-4 border-t-transparent  ${
          color ? color : 'border-blue'
        }  rounded-full animate-spin`}
      ></div>
    </div>
  );
}
