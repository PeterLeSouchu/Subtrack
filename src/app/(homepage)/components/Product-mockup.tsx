import {
  BarChart3,
  Car,
  Check,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  History,
  Home,
  LayoutDashboard,
  Plus,
  Search,
  Shield,
  Tv,
  User,
  Wifi,
  Zap,
} from 'lucide-react';

// Decorative mock of the logged-in dashboard. Sample data only.
const rows = [
  { name: 'Loyer', category: 'Logement', price: '720,00', icon: Home, tone: 'bg-brand-600' },
  { name: 'Crédit auto', category: 'Crédits', price: '189,00', icon: Car, tone: 'bg-indigo-500' },
  { name: 'Électricité', category: 'Logement', price: '86,00', icon: Zap, tone: 'bg-sky-500' },
  { name: 'Mutuelle', category: 'Santé', price: '48,00', icon: HeartPulse, tone: 'bg-cyan-500' },
  { name: 'Box internet', category: 'Services', price: '34,99', icon: Wifi, tone: 'bg-blue-400' },
  { name: 'Salle de sport', category: 'Autres', price: '29,90', icon: Dumbbell, tone: 'bg-violet-500' },
  { name: 'Assurance habitation', category: 'Assurances', price: '21,00', icon: Shield, tone: 'bg-slate-500' },
  { name: 'Cantine', category: 'Éducation', price: '100,00', icon: GraduationCap, tone: 'bg-teal-500' },
];

const donut = [
  { value: 52, color: '#2F43E0' },
  { value: 14, color: '#6366F1' },
  { value: 10, color: '#0EA5E9' },
  { value: 8, color: '#14B8A6' },
  { value: 7, color: '#06B6D4' },
  { value: 5, color: '#8B5CF6' },
  { value: 4, color: '#93A5FF' },
];

function Donut() {
  const r = 38;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox='0 0 100 100' className='h-full w-full -rotate-90'>
      <circle cx='50' cy='50' r={r} fill='none' stroke='#EEF1FF' strokeWidth='12' />
      {donut.map((seg) => {
        const len = (seg.value / 100) * c;
        const el = (
          <circle
            key={seg.color}
            cx='50'
            cy='50'
            r={r}
            fill='none'
            stroke={seg.color}
            strokeWidth='12'
            strokeDasharray={`${Math.max(len - 1.5, 0)} ${c}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

export default function ProductMockup() {
  return (
    <div
      aria-hidden='true'
      className='overflow-hidden rounded-2xl bg-white text-left text-ink shadow-mockup ring-1 ring-ink/5'
    >
      {/* Browser chrome */}
      <div className='flex items-center gap-3 border-b border-line bg-slate-50/80 px-4 py-2.5'>
        <div className='flex gap-1.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-[#FF5F57]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#FEBC2E]' />
          <span className='h-2.5 w-2.5 rounded-full bg-[#28C840]' />
        </div>
        <div className='mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md bg-white text-[11px] text-stattext ring-1 ring-line'>
          subtrack.app/dashboard
        </div>
        <div className='w-10' />
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <aside className='hidden w-48 shrink-0 flex-col gap-6 border-r border-line bg-slate-50/50 p-3 md:flex'>
          <div className='flex items-center gap-2 px-2 pt-1'>
            <span className='h-6 w-6 rounded-md bg-gradient-to-b from-brand-500 to-brand-700' />
            <span className='text-sm font-semibold'>Subtrack</span>
          </div>
          <div className='flex flex-col gap-0.5 text-[13px]'>
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Historique', icon: History },
              { label: 'Bilan', icon: BarChart3 },
              { label: 'Profil', icon: User },
            ].map(({ label, icon: Icon, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
                  active
                    ? 'bg-white font-medium text-ink shadow-soft ring-1 ring-ink/5'
                    : 'text-stattext'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-brand-600' : ''}`} />
                {label}
              </span>
            ))}
          </div>
          <div className='mt-auto rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-3 text-white'>
            <p className='text-[11px] text-brand-100'>Limite Alimentation</p>
            <p className='mt-1 text-sm font-semibold'>312 € / 400 €</p>
            <div className='mt-2 h-1.5 rounded-full bg-white/20'>
              <div className='h-full w-3/4 rounded-full bg-white' />
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className='min-w-0 flex-1 p-4 md:p-6'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-[11px] font-medium text-stattext'>Septembre 2026</p>
              <p className='text-lg font-semibold tracking-tight md:text-xl'>Dashboard</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='hidden h-8 w-40 items-center gap-2 rounded-lg px-2.5 text-xs text-stattext ring-1 ring-line lg:flex'>
                <Search className='h-3.5 w-3.5' /> Rechercher…
              </span>
              <span className='flex h-8 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white shadow-glow'>
                <Plus className='h-3.5 w-3.5' /> Nouvelle mensualité
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className='mt-5 grid grid-cols-3 gap-2.5 md:gap-3'>
            <div className='relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-3 text-white md:p-4'>
              <p className='text-[11px] text-brand-100'>Total du mois</p>
              <p className='mt-1 whitespace-nowrap text-[15px] font-semibold tracking-tight sm:text-lg md:text-2xl'>1 228,89 €</p>
              <p className='mt-1 hidden text-[11px] text-brand-100 sm:block'>+2,4 % vs août</p>
              <div className='absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10' />
            </div>
            <div className='rounded-xl p-3 ring-1 ring-line md:p-4'>
              <p className='text-[11px] text-stattext'>Mensualités</p>
              <p className='mt-1 whitespace-nowrap text-[15px] font-semibold tracking-tight sm:text-lg md:text-2xl'>8</p>
              <p className='mt-1 hidden text-[11px] text-emerald-600 sm:block'>Toutes reconduites</p>
            </div>
            <div className='rounded-xl p-3 ring-1 ring-line md:p-4'>
              <p className='text-[11px] text-stattext'>Moyenne</p>
              <p className='mt-1 whitespace-nowrap text-[15px] font-semibold tracking-tight sm:text-lg md:text-2xl'>153,61 €</p>
              <p className='mt-1 hidden text-[11px] text-stattext sm:block'>Par mensualité</p>
            </div>
          </div>

          <div className='mt-3 grid gap-3 lg:grid-cols-[1fr_15rem]'>
            {/* Table */}
            <div className='overflow-hidden rounded-xl ring-1 ring-line'>
              <div className='grid grid-cols-[1fr_auto] gap-4 border-b border-line bg-slate-50/70 px-3 py-2 text-[11px] font-medium text-stattext sm:grid-cols-[1fr_7rem_5rem] md:px-4'>
                <span>Nom</span>
                <span className='hidden sm:block'>Catégorie</span>
                <span className='text-right'>Prix</span>
              </div>
              {rows.slice(0, 6).map(({ name, category, price, icon: Icon, tone }) => (
                <div
                  key={name}
                  className='grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-3 py-2 text-[13px] last:border-b-0 sm:grid-cols-[1fr_7rem_5rem] md:px-4'
                >
                  <span className='flex min-w-0 items-center gap-2.5'>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white ${tone}`}>
                      <Icon className='h-3.5 w-3.5' />
                    </span>
                    <span className='truncate font-medium'>{name}</span>
                  </span>
                  <span className='hidden sm:block'>
                    <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-stattext'>
                      {category}
                    </span>
                  </span>
                  <span className='text-right font-medium'>{price} €</span>
                </div>
              ))}
            </div>

            {/* Donut */}
            <div className='hidden flex-col rounded-xl p-4 ring-1 ring-line lg:flex'>
              <p className='text-[13px] font-semibold'>Par catégorie</p>
              <div className='relative mx-auto my-4 h-32 w-32'>
                <Donut />
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                  <span className='text-[10px] text-stattext'>Total</span>
                  <span className='text-sm font-semibold'>1 229 €</span>
                </div>
              </div>
              <div className='flex flex-col gap-1.5 text-[11px]'>
                {[
                  ['Logement', '#2F43E0', '66 %'],
                  ['Crédits', '#6366F1', '15 %'],
                  ['Éducation', '#14B8A6', '8 %'],
                  ['Autres', '#93A5FF', '11 %'],
                ].map(([label, color, pct]) => (
                  <span key={label} className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full' style={{ backgroundColor: color }} />
                    <span className='flex-1 text-stattext'>{label}</span>
                    <span className='font-medium'>{pct}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FloatingRenewal() {
  return (
    <div className='flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-float ring-1 ring-ink/5 backdrop-blur'>
      <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100'>
        <Check className='h-4 w-4' strokeWidth={2.5} />
      </span>
      <div>
        <p className='text-[13px] font-semibold text-ink'>Mensualités reconduites</p>
        <p className='text-xs text-stattext'>8 lignes copiées vers octobre</p>
      </div>
    </div>
  );
}

export function FloatingLimit() {
  return (
    <div className='w-60 rounded-2xl bg-white p-4 shadow-float ring-1 ring-ink/5 backdrop-blur'>
      <div className='flex items-center justify-between'>
        <span className='flex items-center gap-2 text-[13px] font-semibold text-ink'>
          <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600'>
            <Tv className='h-3.5 w-3.5' />
          </span>
          Limite Services
        </span>
        <span className='rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-200'>
          92 %
        </span>
      </div>
      <div className='mt-3 h-2 overflow-hidden rounded-full bg-slate-100'>
        <div className='h-full w-[92%] rounded-full bg-gradient-to-r from-brand-500 to-amber-400' />
      </div>
      <p className='mt-2 text-xs text-stattext'>55,20 € sur 60 € ce mois-ci</p>
    </div>
  );
}
