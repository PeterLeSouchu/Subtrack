export default function Spinner({ color }: { color?: string }) {
  return (
    <div
      role="status"
      aria-label="Chargement"
      className="flex items-center w-full h-full justify-center"
    >
      <div
        className={`w-7 h-7 border-[3px] border-t-transparent ${
          color ? color : "border-brand-500"
        } rounded-full animate-spin`}
      ></div>
    </div>
  );
}
