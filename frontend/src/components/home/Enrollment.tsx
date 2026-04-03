import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function Enrollment() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-7/12">
            <Reveal width="100%">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
                <span className="pr-5 border-r-4 border-primary">School Enrollment</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-handlee">Application Calling</h1>
              <p className="text-gray-600 mb-4 leading-relaxed">
                WP/NG Andiambalam Maha Vidyalaya is classified as a 1AB school by the Ministry of Education. Accordingly, applications are invited for the admission of children to Andiambalam Maha Vidyalaya on 03 occasions. You can also apply in the following cases:
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Grade 06 Enrollment', 
                  'Advance Level Enrollment', 
                  '13 Years Guaranteed Education Enrollment'
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-dark font-medium py-1">
                    <CheckCircle2 className="text-green-600 w-5 h-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/classes">
                <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-sm font-bold shadow-sm uppercase text-sm">
                  Applications
                </Button>
              </Link>
            </Reveal>
          </div>
          <div className="lg:w-5/12">
            <Reveal width="100%">
              <Image 
                src="/img/about-1.jpg" 
                alt="Enrollment" 
                width={600} 
                height={600} 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="w-full rounded shadow-sm"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
