'use client';

import { ReactNode, useEffect, useState } from 'react';
import SiteNav from './Site-nav';
import SiteFooter from './Site-footer';

export type LegalSectionData = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function LegalPage({
  title,
  sections,
  numbered = false,
}: {
  title: string;
  sections: LegalSectionData[];
  numbered?: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    // Active = last section whose top has passed just below the fixed nav.
    const onScroll = () => {
      const offset = 140;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(sections[sections.length - 1]?.id);
        return;
      }
      let current = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <div className='min-h-screen overflow-x-clip bg-white text-ink'>
      <SiteNav />

      <main className='mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-28 md:grid-cols-[17rem_1fr] md:gap-16 md:px-8 md:pb-28 md:pt-36'>
        <aside className='hidden md:block'>
          <div className='sticky top-28 pt-[3.75rem]'>
            <p className='px-3 text-sm font-semibold text-ink'>Sur cette page</p>
            <ul className='mt-3 flex flex-col gap-1 border-l border-line'>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={`-ml-px flex gap-2 rounded-r-lg border-l-2 py-2 pl-3 pr-3 text-sm leading-snug transition-colors ${
                      active === section.id
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-transparent text-stattext hover:border-slate-300 hover:bg-slate-50 hover:text-ink'
                    }`}
                  >
                    {numbered && (
                      <span
                        className={
                          active === section.id
                            ? 'text-brand-600'
                            : 'text-slate-400'
                        }
                      >
                        {i + 1}.
                      </span>
                    )}
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className='flex max-w-3xl flex-col gap-4'>
          <h1 className='mb-4 pb-1 text-3xl font-semibold tracking-[-0.03em] text-brand-600'>
            {title}
          </h1>
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className='scroll-mt-32 rounded-2xl p-6 ring-1 ring-line transition-shadow md:p-8'
            >
              <div className='flex items-center gap-3'>
                {numbered && (
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-100'>
                    {i + 1}
                  </span>
                )}
                <h2 className='text-xl font-semibold tracking-tight text-ink'>
                  {section.title}
                </h2>
              </div>
              <div className='mt-3 leading-relaxed text-stattext'>
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
