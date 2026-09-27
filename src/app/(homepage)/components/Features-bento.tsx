import {
  CalendarClock,
  Check,
  Clock,
  Gauge,
  History,
  LayoutDashboard,
  LineChart,
  Lock,
  Smartphone,
} from 'lucide-react';
import { ReactNode } from 'react';

function Tile({
  icon: Icon,
  title,
  description,
  children,
  className = '',
}: {
  icon: typeof Lock;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink/5 md:p-7 ${className}`}
    >
      <div className='relative z-10'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100'>
          <Icon className='h-5 w-5' />
        </span>
        <h3 className='mt-5 text-lg font-semibold tracking-tight text-ink'>
          {title}
        </h3>
        <p className='mt-2 max-w-md text-[0.95rem] leading-relaxed text-stattext'>
          {description}
        </p>
      </div>
      {children && <div className='relative mt-6 flex-1'>{children}</div>}
    </article>
  );
}

const categories = [
  { name: 'Logement', value: 720, width: '100%', color: 'bg-brand-600' },
  { name: 'Crédits', value: 189, width: '26%', color: 'bg-indigo-500' },
  { name: 'Éducation', value: 100, width: '14%', color: 'bg-teal-500' },
  { name: 'Santé', value: 48, width: '7%', color: 'bg-cyan-500' },
];

const months = [
  { m: 'Oct', v: 54 },
  { m: 'Nov', v: 58 },
  { m: 'Déc', v: 72 },
  { m: 'Jan', v: 61 },
  { m: 'Fév', v: 60 },
  { m: 'Mar', v: 64 },
  { m: 'Avr', v: 66 },
  { m: 'Mai', v: 63 },
  { m: 'Juin', v: 70 },
  { m: 'Juil', v: 74 },
  { m: 'Août', v: 78 },
  { m: 'Sep', v: 82 },
];

const limits = [
  { name: 'Alimentation', used: 78, label: '312 € / 400 €', tone: 'from-brand-500 to-brand-600' },
  { name: 'Services', used: 92, label: '55 € / 60 €', tone: 'from-brand-500 to-amber-400' },
  { name: 'Transport', used: 40, label: '80 € / 200 €', tone: 'from-brand-500 to-brand-600' },
];

export default function FeaturesBento() {
  return (
    <div className='grid gap-4 md:grid-cols-6'>
      <Tile
        icon={LayoutDashboard}
        title='Un tableau de bord clair'
        description='Toutes vos mensualités, classées par catégorie. Le total et la répartition se mettent à jour à chaque ajout.'
        className='md:col-span-4'
      >
        <div className='flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-ink/5 md:p-5'>
          {categories.map((c) => (
            <div key={c.name} className='grid grid-cols-[6rem_1fr_4rem] items-center gap-3 text-sm'>
              <span className='font-medium text-ink'>{c.name}</span>
              <span className='h-2.5 overflow-hidden rounded-full bg-white ring-1 ring-ink/5'>
                <span
                  className={`block h-full rounded-full ${c.color}`}
                  style={{ width: c.width }}
                />
              </span>
              <span className='text-right font-medium text-ink'>{c.value} €</span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile
        icon={CalendarClock}
        title='Reconduction automatique'
        description='Saisissez une mensualité une seule fois. Elle est reportée chaque mois, sans rien faire.'
        className='md:col-span-2'
      >
        <ol className='flex flex-col gap-2'>
          {[
            { m: 'Septembre', done: true },
            { m: 'Octobre', done: true },
            { m: 'Novembre', done: false },
          ].map(({ m, done }) => (
            <li
              key={m}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm ring-1 ${
                done ? 'bg-white shadow-soft ring-ink/5' : 'bg-slate-50 ring-line'
              }`}
            >
              <span className='flex items-center gap-2.5 font-medium text-ink'>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    done ? 'bg-brand-600 text-white' : 'bg-white text-stattext ring-1 ring-line'
                  }`}
                >
                  {done ? <Check className='h-3 w-3' strokeWidth={3} /> : <Clock className='h-3 w-3' />}
                </span>
                {m}
              </span>
              <span className='text-xs text-stattext'>{done ? '8 mensualités' : 'Automatique'}</span>
            </li>
          ))}
        </ol>
      </Tile>

      <Tile
        icon={Gauge}
        title='Des limites par catégorie'
        description='Fixez un plafond et voyez tout de suite quand vous vous en approchez.'
        className='md:col-span-2'
      >
        <div className='flex flex-col gap-4'>
          {limits.map((l) => (
            <div key={l.name}>
              <div className='flex justify-between text-xs'>
                <span className='font-medium text-ink'>{l.name}</span>
                <span className='text-stattext'>{l.label}</span>
              </div>
              <div className='mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100'>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${l.tone}`}
                  style={{ width: `${l.used}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Tile>

      <Tile
        icon={LineChart}
        title='Un bilan mois par mois'
        description='Comparez vos dépenses sur l’année et repérez les mois qui ont dérapé.'
        className='md:col-span-4'
      >
        <div className='flex h-36 items-end gap-1.5 sm:gap-2'>
          {months.map((b, i) => (
            <div key={b.m} className='flex flex-1 flex-col items-center gap-2'>
              <div
                className={`w-full rounded-md ${
                  i === months.length - 1
                    ? 'bg-gradient-to-t from-brand-700 to-brand-500 shadow-glow'
                    : 'bg-brand-100'
                }`}
                style={{ height: `${b.v * 1.3}px` }}
              />
              <span className='text-[10px] text-stattext sm:text-[11px]'>{b.m}</span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile
        icon={History}
        title='Un historique complet'
        description='Chaque mois est archivé. Retrouvez ce que vous payiez il y a un an en deux clics.'
        className='md:col-span-2'
      />
      <Tile
        icon={Smartphone}
        title='Sur tous vos écrans'
        description='Ordinateur, tablette ou téléphone : l’interface s’adapte à votre appareil.'
        className='md:col-span-2'
      />
      <Tile
        icon={Lock}
        title='Privé et sécurisé'
        description='Mots de passe chiffrés, aucun lien bancaire. Vous êtes le seul à voir vos dépenses.'
        className='md:col-span-2'
      />
    </div>
  );
}
