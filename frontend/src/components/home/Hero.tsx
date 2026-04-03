import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function Hero() {
  return (
    <section className="relative bg-primary py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 text-white px-3">
           <Reveal width="100%">
            <h4 className="text-4xl mb-4 font-handlee capitalize">Welcome to</h4>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-4 font-handlee">
              WP/NG/ Andiambalama Maha Vidyalaya
            </h1>
            <p className="text-white mb-4 leading-relaxed">
              welcome to our vibrant school community! We are thrilled to have you join us on our digital journey as we embark on our academic years fille with learning growth and exciting oppotunities. Our website serves as a gateway to the heart of our educational community, offering valuable insights into our rich history, vibrant culture, and diverse array of academic and extracurricular programs. Here, you will find comprehensive information about our curriculum, Grades and Sections, facilities, and upcoming events. Additionally, our website serves as a platform for communication, enabling seamless interaction between students, parents, teachers, and administrators.
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-secondary hover:bg-secondary-hover text-dark border-none font-bold px-10 py-3 mt-1 rounded-sm">
                Learn More
              </Button>
            </Link>
          </Reveal>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <Reveal width="100%">
            <div className="relative w-full max-w-lg">
                <Image 
                  src="/img/header.png" 
                  alt="Header Background" 
                  width={600}
                  height={600}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="w-full h-auto mt-5"
                />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
