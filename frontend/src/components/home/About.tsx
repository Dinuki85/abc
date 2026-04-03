import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-5/12">
            <Reveal width="100%">
              <Image 
                src="/img/about-1.jpg" 
                alt="Our School" 
                width={800} 
                height={800} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="w-full rounded shadow-sm"
              />
            </Reveal>
          </div>
          <div className="lg:w-7/12">
            <Reveal width="100%">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
                <span className="pr-5 border-r-4 border-primary">Learn About Us</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-handlee">Best School For Your Kids</h1>
              <p className="text-gray-600 mb-4">
                Delve into the vibrant history of Andiambalama Maha Vidyalaya, a beacon of educational excellence nestled in the heart of Andiambalama. Established in During the British colonial period, our school has been a cornerstone of the community for generations, shaping the minds and futures of countless students over the years.
              </p>
              <p className="text-gray-600 mb-6">
                From humble beginnings to our current status as a renowned educational institution, our journey has been marked by dedication, innovation, and a steadfast commitment to nurturing the intellectual, social, and emotional growth of our students as wel as...
              </p>
              <div className="flex flex-col md:flex-row gap-4 mb-4 items-start">
                <div className="w-full md:w-1/3">
                   <Image src="/img/about-2.jpg" alt="Awards" width={300} height={200} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px" className="w-full h-auto rounded" />
                </div>
                <div className="w-full md:w-2/3">
                  <ul className="space-y-0">
                    {[
                      'Academic Excellence', 
                      'Critical Thinking and Problem-Solving Skills', 
                      'Responsibility and Work Ethic'
                    ].map((item, idx) => (
                      <li key={item} className={`flex items-center gap-3 text-dark font-medium py-3 border-gray-200 ${idx === 0 ? 'border-t border-b' : 'border-b last:border-b'}`}>
                        <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-sm font-bold shadow-sm mt-2">
                  Learn More
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
