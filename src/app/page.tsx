'use client';

import Link from 'next/link';
import AccordionHomePage from '../components/Accordion-home-page';

import { BookIcon, ChartIcon, LockIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className='px-4 -my-12'>
      <section className=' flex justify-evenly md:flex-row md:gap-0 gap-8 flex-col items-center min-h-screen p-3'>
        <div className={` flex flex-col gap-9 justify-center md:w-1/2  `}>
          <p className='md:text-5xl text-4xl font-semibold text-center'>
            La solution <span className='font-black '>intelligente</span> pour
            une gestion sereine de vos mensualités.
          </p>
          <div className='flex items-center justify-evenly'>
            <div className='   text-gray-500 flex items-center justify-center gap-2  flex-col '>
              <ChartIcon className='text-icon  md:w-20 md:h-20 h-12 w-12' />

              <p className='text-center text-sm md:text-base font-extrabold '>
                Visualisation graphique
              </p>
            </div>
            <div className='rounded-3xl text-gray-500  flex items-center gap-2 justify-center flex-col '>
              <BookIcon className='text-icon  md:w-20 md:h-20 h-12 w-12' />

              <p className='text-center  text-sm md:text-base font-extrabold'>
                historique de vos mensualités
              </p>
            </div>
            <div className='rounded-3xl text-gray-500  flex items-center gap-2  justify-center flex-col'>
              <LockIcon className='text-icon  md:w-20 md:h-20 h-12 w-12' />

              <p className='text-center text-sm md:text-base font-extrabold'>
                Limitations budgétaires
              </p>
            </div>
          </div>
          <Link
            href='/sign-up'
            className='relative overflow-hidden bg-blue p-2 font-extrabold rounded-xl text-white w-44 mx-auto text-center mt-5
    transition-all duration-300 ease-out hover:scale-105 
    hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] 
    before:absolute before:top-0 before:left-[-100%] before:h-full before:w-full 
    before:bg-white before:opacity-0 before:skew-x-[-30deg] 
    before:transition-all before:duration-500 hover:before:left-[120%] 
    hover:before:opacity-30'
          >
            Découvrir Subtrack
          </Link>
        </div>
      </section>
      <h2 className='font-bold md:text-4xl text-3xl pb-10 text-center'>
        À quoi ça ressemble ?
      </h2>
      <video
        width='320'
        height='240'
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
        className='md:w-2/3 w-full  pointer-events-none rounded-md mx-auto  shadow-2xl'
      >
        <source src='/video/subtrack-demo.mp4' type='video/mp4' />
      </video>

      <section className=' l p-3 flex  items-center flex-col md:pt-32 pt-20 '>
        <h2 className='font-bold md:text-4xl text-3xl pb-10 text-center w-full mb-7'>
          Des questions ?
        </h2>

        <AccordionHomePage />
      </section>
    </div>
  );
}
