'use client';

// import Image from 'next/image';
import Link from 'next/link';
import AccordionComponent from '../components/Accordion';

import { FaChartBar, FaLock } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';

export default function Home() {
  return (
    <div className='px-4 -my-12'>
      <section className=' flex justify-evenly md:flex-row md:gap-0 gap-8 flex-col items-center min-h-screen p-3'>
        <div className={` flex flex-col gap-9 justify-center md:w-1/2  `}>
          <p className='md:text-5xl text-4xl font-semibold text-center'>
            La solution <span className='font-black '>intelligente</span> pour
            une gestion sereine de vos mensualités.
          </p>
          <p className='md:text-2xl text-xl font-semibold text-center text-gray-500'>
            Bienvenue sur Subtrack, une plateforme moderne pour suivre et
            analyser efficacement vos mensualités
          </p>
          <Link
            href='/sign-up'
            className='md:hover:bg-    bg-colorone p-2 font-extrabold  rounded-xl text-white w-44 mx-auto text-center mt-5'
          >
            {' '}
            Découvrir Subtrack
          </Link>
        </div>
      </section>
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
      <section className='flex flex-col lg:flex-row  max-w-7xl mx-auto gap-6  my-20 mt-48   '>
        <div className='p-10 rounded-3xl bg-colorone text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <FaChartBar className='md:text-8xl text-6xl ' />
          <h3 className='text-center text-xl font-extrabold'>Analysez</h3>
          <p className='text-center'>
            Visualisez vos mensualités en toute simplicité grâce à des
            graphiques détaillés et organisés par catégorie.
          </p>
        </div>
        <div className='p-10 rounded-3xl bg-colorone text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <IoBook className='md:text-8xl text-6xl ' />

          <h3 className='text-center text-xl font-extrabold'>Consultez</h3>
          <p className='text-center'>
            Accédez à l&apos;historique de vos mensualités, et suivez
            l&apos;évolution de vos finances au fil du temps.
          </p>
        </div>
        <div className='p-10 rounded-3xl bg-colorone text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <FaLock className='md:text-8xl text-6xl ' />
          <h3 className='text-center text-xl font-extrabold'>Limitez</h3>
          <p className='text-center'>
            Définissez des limites budgétaires pour chaque catégorie et
            maîtrisez vos dépenses en restant dans les seuils que vous avez
            fixés.
          </p>
        </div>
      </section>
      <section className=' l p-3 flex  items-center flex-col md:pt-32 pt-20 '>
        <h2 className='font-bold md:text-4xl text-3xl pb-10 text-center'>
          Des questions ?
        </h2>
        <div className='max-w-7xl w-full flex justify-center'>
          <AccordionComponent />
        </div>
      </section>
    </div>
  );
}
