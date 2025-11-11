export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return <p className='text-center text-red-600'>{message}</p>;
}
