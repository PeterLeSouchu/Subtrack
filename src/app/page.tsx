'use client';

import Image from 'next/image';
import AccordionComponent from '../components/Accordion';
import { FaQuoteRight, FaQuoteLeft } from 'react-icons/fa6';
import { Roboto } from 'next/font/google';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='md:pt-0 pt-24'>
      <section className=' flex justify-evenly md:flex-row md:gap-0 gap-8 flex-col items-center min-h-screen p-3'>
        <div
          className={` flex flex-col justify-center md:w-1/2 ${roboto.className} h-1/2`}
        >
          <Image
            src='/logo.png'
            alt='logo'
            className='mx-auto w-1/4 min-w-60 '
            width={200}
            height={200}
          />
          <h1 className='text-center font-bold xl:text-7xl md:text-6xl text-5xl  mb-5'>
            SubTrack
          </h1>
          <p className='font-semibold md:text-2xl text-xl text-center'>
            <FaQuoteLeft className='inline mx-3' />
            la solution intelligente pour une gestion sereine de vos mensualités
            <FaQuoteRight className='inline mx-3' />
          </p>
        </div>

        <Carousel
          className='md:w-1/2 w-full  md:pt-0 pt-24 '
          responsive={responsive}
        >
          <Image
            src='/dashboard1.jpg'
            alt='dashboard'
            className='mx-auto w-3/4   rounded-lg '
            width={500}
            height={500}
          />
          <Image
            src='/dashboard2.jpg'
            alt='dashboard2'
            className='mx-auto w-3/4  rounded-lg '
            width={500}
            height={500}
          />
          <Image
            src='/dashboard3.jpg'
            alt='dashboard2'
            className='mx-auto w-3/4  rounded-lg '
            width={500}
            height={500}
          />
        </Carousel>
      </section>
      <section className=' min-h-screen p-3 flex  items-center flex-col md:pt-32 pt-20 '>
        <h2 className='font-bold md:text-4xl text-3xl pb-10 text-center'>
          À propos de l&apos;application :
        </h2>
        <div className='max-w-7xl w-full flex justify-center'>
          <AccordionComponent />
        </div>
      </section>
    </div>
  );
}
