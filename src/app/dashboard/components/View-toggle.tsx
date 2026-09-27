import { List, PieChart } from 'lucide-react';

export function ViewToggle({
  showGraphic,
  setShowGraphic,
}: {
  showGraphic: boolean;
  setShowGraphic: (value: boolean) => void;
}) {
  const options = [
    { label: 'Liste', icon: List, value: false },
    { label: 'Graphique', icon: PieChart, value: true },
  ];

  return (
    <div
      role='tablist'
      aria-label='Affichage'
      className='inline-flex w-full rounded-xl bg-white p-1 shadow-soft ring-1 ring-ink/5 sm:w-auto xl:hidden'
    >
      {options.map(({ label, icon: Icon, value }) => {
        const selected = showGraphic === value;
        return (
          <button
            key={label}
            type='button'
            role='tab'
            aria-selected={selected}
            onClick={() => setShowGraphic(value)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:flex-none ${
              selected
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-stattext hover:text-ink'
            }`}
          >
            <Icon className='h-4 w-4' />
            {label}
          </button>
        );
      })}
    </div>
  );
}
