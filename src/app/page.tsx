'use client';

import Image from 'next/image';
import Link from 'next/link';
import AccordionComponent from '../components/Accordion';
import { FaQuoteRight, FaQuoteLeft } from 'react-icons/fa6';
import { FaChartPie, FaChartBar, FaLock } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='md:pt-0 pt-24'>
      <section className=' flex justify-evenly md:flex-row md:gap-0 gap-8 flex-col items-center min-h-screen p-3'>
        <div className={` flex flex-col justify-center md:w-1/2 `}>
          <Image
            src='/logo.png'
            alt='logo'
            className='mx-auto w-1/4 min-w-60 '
            width={200}
            height={200}
          />
          <h1 className='text-center font-black xl:text-7xl md:text-7xl text-6xl  mb-5'>
            SubTrack
          </h1>
          <p className='font-semibold md:text-2xl text-xl text-center'>
            <FaQuoteLeft className='inline mx-3' />
            la solution intelligente pour une gestion sereine de vos mensualités
            <FaQuoteRight className='inline mx-3' />
          </p>
          <Link
            href='/sign-up'
            className='md:hover:bg-custom-gradient2   bg-custom-gradient1 p-2  rounded-xl text-white w-44 mx-auto text-center mt-5'
          >
            {' '}
            Découvrir Subtrack
          </Link>
        </div>

        <Image
          src='/dashboard1.jpg'
          alt='dashboard'
          className='mx-auto   rounded-lg max-w-2xl md:w-1/2 w-5/6  md:mt-0 mt-24 drop-shadow-lg '
          width={500}
          height={500}
        />
      </section>
      <section className='flex flex-col lg:flex-row  max-w-7xl mx-auto gap-6 my-20 mt-48  '>
        <div className='p-10 rounded-3xl bg-nav text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <FaChartPie className='md:text-8xl text-6xl ' />
          <h3 className='text-center text-xl font-extrabold'>Analysez</h3>
          <p className='text-center'>
            Visualisez vos mensualités en toute simplicité grâce à des
            graphiques détaillés et organisés par catégorie.
          </p>
        </div>
        <div className='p-10 rounded-3xl bg-nav text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <FaChartBar className='md:text-8xl text-6xl ' />
          <h3 className='text-center text-xl font-extrabold'>Comparez</h3>
          <p className='text-center'>
            Consultez l&apos;historique de vos mensualités, gardez une trace de
            vos dépenses passées et suivez l&apos;évolution de vos finances au
            fil du temps.
          </p>
        </div>
        <div className='p-10 rounded-3xl bg-nav text-white flex items-center justify-center flex-col md:w-1/2 lg:w-1/4  w-3/4 gap-4 mx-auto'>
          <FaLock className='md:text-8xl text-6xl ' />
          <h3 className='text-center text-xl font-extrabold'>Limitez</h3>
          <p className='text-center'>
            Définissez des limites budgétaires pour chaque catégorie et
            maîtrisez vos dépenses en restant dans les seuils que vous avez
            fixés.
          </p>
        </div>
      </section>
      <section className=' min-h-screen p-3 flex  items-center flex-col md:pt-32 pt-20 '>
        <h2 className='font-bold md:text-4xl text-3xl pb-10 text-center'>
          FAQ :
        </h2>
        <div className='max-w-7xl w-full flex justify-center'>
          <AccordionComponent />
        </div>
      </section>
    </div>
  );
}
