export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p
      role="alert"
      className='rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700'
    >
      {message}
    </p>
  );
}
