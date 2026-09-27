import Image from 'next/image';
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Hash,
  History,
  LayoutDashboard,
  LogOut,
  PencilLine,
  Plus,
  Receipt,
  Search,
  Trash2,
  TrendingUp,
  User,
  Wallet,
  X,
} from 'lucide-react';
import { LogoMark } from '@/src/components/Logo-mark';
import { AlertIcon } from '@/src/components/icons';

// Decorative mock of the logged-in dashboard, mirroring the real layout.
// Sample data only. Rows are sorted by price like the real API.
const IMG = 'https://res.cloudinary.com/dix2wzs7n/image/upload/';
const categories = {
  Logement: { color: '#E63946', image: `${IMG}v1742665873/pztdckqoch294dxnumh8.webp` },
  Crédits: { color: '#FF4500', image: `${IMG}v1742666665/toj6prfhgjuioivfgxla.png` },
  Éducation: { color: '#6A0572', image: `${IMG}v1742667001/kh6lcdarxw3xw9avaynz.png` },
  Santé: { color: '#FFD700', image: `${IMG}v1742666766/vby5o8olmdbf4coeqvhc.png` },
  Services: { color: '#4CAF50', image: `${IMG}v1742669730/gt93ijd8pwhhtnq5rxcc.webp` },
  Assurances: { color: '#F4A261', image: `${IMG}v1742666164/mwgevfytwuesfwyrfwlt.png` },
};
type CategoryName = keyof typeof categories;

const rows: { name: string; category: CategoryName; price: string }[] = [
  { name: 'Assurance habitation', category: 'Assurances', price: '21' },
  { name: 'Box internet', category: 'Services', price: '34.99' },
  { name: 'Mutuelle', category: 'Santé', price: '48' },
  { name: 'Électricité', category: 'Logement', price: '86' },
  { name: 'Cantine', category: 'Éducation', price: '100' },
  { name: 'Crédit auto', category: 'Crédits', price: '189' },
  { name: 'Loyer', category: 'Logement', price: '720' },
];

const breakdown: { name: CategoryName; price: string; percentage: number }[] = [
  { name: 'Logement', price: '806', percentage: 67.2 },
  { name: 'Crédits', price: '189', percentage: 15.8 },
  { name: 'Éducation', price: '100', percentage: 8.3 },
  { name: 'Santé', price: '48', percentage: 4 },
  { name: 'Services', price: '34.99', percentage: 2.9 },
  { name: 'Assurances', price: '21', percentage: 1.8 },
];

function Donut() {
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox='0 0 100 100' className='h-full w-full -rotate-90'>
      {breakdown.map((seg) => {
        const len = (seg.percentage / 100) * c;
        const el = (
          <circle
            key={seg.name}
            cx='50'
            cy='50'
            r={r}
            fill='none'
            stroke={categories[seg.name].color}
            strokeWidth='9'
            strokeDasharray={`${Math.max(len - 1.2, 0.4)} ${c}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function Chip({ name }: { name: CategoryName }) {
  return (
    <span className='inline-flex w-fit items-center gap-1 rounded-full bg-slate-100/80 py-0.5 pl-0.5 pr-2 text-[10px] font-medium text-stattext ring-1 ring-inset ring-ink/5'>
      <Image
        src={categories[name].image}
        alt=''
        width={24}
        height={24}
        className='h-3.5 w-3.5 object-contain'
      />
      {name}
    </span>
  );
}

function Stat({
  label,
  value,
  hint,
  icon: Icon,
  featured = false,
  className = '',
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon: typeof Wallet;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-xl p-3 md:p-3.5 ${
        featured
          ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-glow'
          : 'bg-white shadow-soft ring-1 ring-ink/5'
      } ${className}`}
    >
      {featured && (
        <span className='absolute -right-6 -top-6 -z-10 h-20 w-20 rounded-full bg-white/10' />
      )}
      <div className='flex items-center justify-between gap-2'>
        <span className={`truncate text-[11px] font-medium ${featured ? 'text-brand-100' : 'text-stattext'}`}>
          {label}
        </span>
        <span
          className={`hidden h-6 w-6 shrink-0 items-center justify-center rounded-md sm:flex ${
            featured
              ? 'bg-white/15 ring-1 ring-inset ring-white/20'
              : 'bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100'
          }`}
        >
          <Icon className='h-3 w-3' />
        </span>
      </div>
      <p className='mt-3 whitespace-nowrap text-base font-semibold tracking-tight md:text-xl'>
        {value}
      </p>
      {hint && (
        <p className={`mt-1 truncate text-[10px] ${featured ? 'text-brand-100' : 'text-stattext'}`}>
          {hint}
        </p>
      )}
    </div>
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

      <div className='flex bg-dashboardbg'>
        {/* Sidebar */}
        <aside className='hidden w-48 shrink-0 flex-col border-r border-line bg-white/70 p-2.5 md:flex'>
          <div className='flex items-center gap-1.5 px-1.5 pt-1'>
            <span className='flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-b from-brand-500 to-brand-700 text-white'>
              <LogoMark className='h-4 w-4' />
            </span>
            <span className='text-sm font-semibold tracking-tight'>Subtrack</span>
          </div>
          <p className='mt-6 px-2.5 pb-1.5 text-[10px] font-medium text-stattext'>Menu</p>
          <div className='flex flex-col gap-0.5 text-[12px] font-medium'>
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Historique', icon: History },
              { label: 'Bilan', icon: BarChart3 },
              { label: 'Profil', icon: User },
            ].map(({ label, icon: Icon, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                  active
                    ? 'bg-white text-ink shadow-soft ring-1 ring-ink/5'
                    : 'text-stattext'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${active ? 'text-brand-600' : ''}`} />
                {label}
              </span>
            ))}
          </div>
          <div className='mt-auto flex items-center gap-2 rounded-xl bg-white p-2 shadow-soft ring-1 ring-ink/5'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-[11px] font-semibold text-white'>
              C
            </span>
            <div className='min-w-0 flex-1'>
              <p className='text-[9px] text-stattext'>Connecté</p>
              <p className='truncate text-[11px] font-medium'>camille@mail.fr</p>
            </div>
            <LogOut className='h-3.5 w-3.5 text-stattext' />
          </div>
        </aside>

        {/* Main */}
        <div className='min-w-0 flex-1 p-3 md:p-5'>
          <p className='text-lg font-semibold tracking-tight md:text-xl'>Tableau de bord</p>
          <p className='mt-0.5 text-[11px] text-stattext'>Vos mensualités de septembre 2026.</p>

          <div className='mt-4 grid grid-cols-3 gap-2 lg:grid-cols-4 md:gap-2.5'>
            <Stat featured icon={Wallet} label='Montant total' value='1198.99 €' hint='Ce mois-ci' />
            <Stat icon={Hash} label='Mensualités' value='7' />
            <Stat icon={Receipt} label='Moyenne' value='171.28 €' hint='Par mensualité' />
            <Stat
              className='hidden lg:block'
              icon={TrendingUp}
              label='Mois précédent'
              value={<span className='text-red-600'>+21 €</span>}
              hint={
                <span className='rounded-full bg-red-50 px-1.5 py-0.5 font-medium text-red-700'>
                  Dépenses en hausse
                </span>
              }
            />
          </div>

          <div className='mt-2.5 grid gap-2.5 lg:grid-cols-[1fr_14rem]'>
            {/* Table */}
            <div className='overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-ink/5'>
              <div className='flex items-center gap-1.5 p-2.5'>
                <span className='flex h-7 min-w-0 flex-1 items-center gap-1.5 truncate rounded-lg bg-slate-50 px-2 text-[10px] text-stattext/80 ring-1 ring-inset ring-ink/5'>
                  <Search className='h-3 w-3 shrink-0' />
                  Rechercher par nom, catégorie ou prix
                </span>
                <span className='hidden h-7 items-center gap-3 rounded-lg bg-white px-2 text-[10px] text-stattext ring-1 ring-inset ring-ink/10 sm:flex'>
                  Catégorie <ChevronDown className='h-3 w-3' />
                </span>
                <span className='flex h-7 items-center gap-1 rounded-lg bg-gradient-to-b from-brand-500 to-brand-600 px-2 text-[10px] font-semibold text-white shadow-glow'>
                  <Plus className='h-3 w-3' />
                  <span className='hidden sm:inline'>Nouvelle mensualité</span>
                </span>
              </div>
              <div className='grid grid-cols-[1fr_auto] gap-3 border-y border-line bg-slate-50/70 px-3 py-1.5 text-[10px] font-medium text-stattext sm:grid-cols-[1fr_6.5rem_3.5rem_2.75rem]'>
                <span>Mensualité</span>
                <span className='hidden sm:block'>Catégorie</span>
                <span className='text-right'>Prix</span>
                <span className='hidden sm:block' />
              </div>
              {rows.slice(0, 6).map(({ name, category, price }) => (
                <div
                  key={name}
                  className='grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-3 py-2.5 text-[12px] last:border-b-0 sm:grid-cols-[1fr_6.5rem_3.5rem_2.75rem]'
                >
                  <span className='truncate font-medium'>{name}</span>
                  <span className='hidden sm:block'>
                    <Chip name={category} />
                  </span>
                  <span className='text-right font-semibold'>{price} €</span>
                  <span className='hidden justify-end gap-1.5 text-stattext/70 sm:flex'>
                    <PencilLine className='h-3 w-3' />
                    <Trash2 className='h-3 w-3' />
                  </span>
                </div>
              ))}
              <div className='border-t border-line bg-slate-50/50 px-3 py-1.5 text-[10px] text-stattext'>
                7 mensualités
              </div>
            </div>

            {/* Donut */}
            <div className='hidden flex-col rounded-xl bg-white p-3.5 shadow-soft ring-1 ring-ink/5 lg:flex'>
              <p className='text-[12px] font-semibold'>Répartition</p>
              <p className='text-[10px] text-stattext'>Par catégorie</p>
              <div className='relative mx-auto my-3 h-28 w-28'>
                <Donut />
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                  <span className='text-[9px] text-stattext'>Total</span>
                  <span className='text-[13px] font-semibold'>1198.99 €</span>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                {breakdown.slice(0, 5).map((c) => (
                  <div key={c.name} className='text-[10px]'>
                    <div className='flex items-center gap-1.5'>
                      <span className='h-1.5 w-1.5 rounded-full' style={{ backgroundColor: categories[c.name].color }} />
                      <span className='flex-1 font-medium'>{c.name}</span>
                      <span className='text-stattext'>{c.percentage}%</span>
                      <span className='w-11 text-right font-semibold'>{c.price} €</span>
                    </div>
                    <div className='ml-3 mt-1 h-1 overflow-hidden rounded-full bg-slate-100'>
                      <div
                        className='h-full rounded-full'
                        style={{ width: `${c.percentage}%`, backgroundColor: categories[c.name].color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Replica of the success toast shown after adding a mensuality.
export function FloatingToast() {
  return (
    <div className='flex w-72 items-start gap-3 rounded-2xl bg-white p-4 text-ink shadow-float ring-1 ring-ink/5'>
      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100'>
        <CheckCircle2 className='h-4 w-4' />
      </span>
      <p className='flex-1 self-center text-sm font-medium'>
        Mensualité ajoutée
      </p>
      <span className='rounded-md p-1 text-stattext'>
        <X className='h-4 w-4' />
      </span>
    </div>
  );
}

// Replica of the limit-exceeded alert from the "Nouvelle mensualité" modal.
export function FloatingLimitAlert() {
  return (
    <div className='w-72 rounded-2xl bg-white p-4 shadow-float ring-1 ring-ink/5'>
      <p className='text-sm font-semibold tracking-tight text-ink'>
        Nouvelle mensualité
      </p>
      <div className='mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100'>
        <AlertIcon width='20' height='20' className='mt-0.5 shrink-0' />
        <p>Vous dépassez la limite de cette catégorie de 60€</p>
      </div>
    </div>
  );
}
