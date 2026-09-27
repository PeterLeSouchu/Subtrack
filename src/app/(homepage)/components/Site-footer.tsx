import Link from 'next/link';
import { Logo } from './Site-nav';

const columns = [
  {
    title: 'Produit',
    links: [
      { href: '/#fonctionnalites', label: 'Fonctionnalités' },
      { href: '/#comment-ca-marche', label: 'Comment ça marche' },
      { href: '/#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Compte',
    links: [
      { href: '/sign-up', label: 'Créer un compte' },
      { href: '/sign-in', label: 'Connexion' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { href: '/legal-notices', label: 'Mentions légales' },
      { href: '/cgu', label: 'CGU' },
      { href: 'mailto:p.lesouchu@gmail.com', label: 'Contact' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className='border-t border-line bg-white'>
      <div className='mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8'>
        <div className='flex flex-col gap-4'>
          <Logo />
          <p className='max-w-xs text-sm leading-relaxed text-stattext'>
            Le suivi de vos mensualités, simple et gratuit. Abonnements,
            crédits, assurances : tout au même endroit.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className='text-sm font-semibold text-ink'>{col.title}</p>
            <ul className='mt-4 flex flex-col gap-3'>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-stattext transition-colors hover:text-brand-600'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='border-t border-line'>
        <div className='mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-stattext sm:flex-row sm:items-center sm:justify-between md:px-8'>
          <p>© {new Date().getFullYear()} Subtrack. Projet portfolio.</p>
          <p>Gratuit, sans publicité.</p>
        </div>
      </div>
    </footer>
  );
}
