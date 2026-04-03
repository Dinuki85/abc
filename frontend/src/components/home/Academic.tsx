import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const classes = [
  { 
    title: 'Grade 6 - 9', 
    img: 'class-1.jpg', 
    desc: 'a diverse range of subjects, including mathematics, science, IT, social studies, and religious education with extracurricular activities.',
    medium: 'Sinhala/English',
    parallel: '04 Classes',
    periods: '08 Periods',
    extracurricular: 'Available'
  },
  { 
    title: 'Grade 10 - 11', 
    img: 'class-2.jpg', 
    desc: 'Preparing for General Certificate of Education Ordinary Level (G.C.E. O/L) examinations, which are a significant milestone in their academic journey.',
    medium: 'Sinhala/English',
    parallel: '03 Classes',
    periods: '08 Periods',
    extracurricular: 'Available'
  },
  { 
    title: 'Advanced Level - Mathematics', 
    img: 'class-3.jpg', 
    desc: 'syllabus aims to provide a strong foundation in mathematics, Physics, Chemistry and IT to pursuing further studies in engineering related fields.',
    medium: 'Sinhala',
    optional: 'IT',
    periods: '08 Periods',
    extracurricular: 'Available'
  },
  { 
    title: 'Advanced Level - Commerce', 
    img: 'class-4.jpg', 
    desc: 'AL Commerce curriculum typically includes subjects like Accounting, Business Studies, Economics, and sometimes subjects like Mathematics and Statistics.',
    medium: 'Sinhala',
    optional: 'IT',
    periods: '08 Periods',
    extracurricular: 'Available'
  },
  { 
    title: 'Advanced Level - Arts', 
    img: 'class-5.jpg', 
    desc: ' stream prepares students for higher education in fields such as social sciences, humanities, law, education, and arts-related disciplines',
    medium: 'Sinhala',
    optional: 'IT & More',
    periods: '08 Periods',
    extracurricular: 'Available'
  },
  { 
    title: '13 Years Guaranteed Education', 
    img: 'class-6.jpg', 
    desc: 'Endeavors to empower its youth with the skills and knowledge necessary for personal development and national progress.',
    medium: 'Sinhala',
    academic: '1 1/2 Years',
    vocational: '06 Months',
    nvq: 'Available'
  }
];

export default function Academic() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Academic</span>
              <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dark mb-4 font-handlee">Classes for Our Students</h1>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls, i) => (
            <Reveal key={i} width="100%">
              <div className="flex flex-col bg-white rounded-xl shadow-professional hover:shadow-professional-hover overflow-hidden border border-gray-100 h-full transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <Image 
                    src={`/img/${cls.img}`} 
                    alt={cls.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" 
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-6 text-center border-b border-gray-100">
                  <h4 className="text-xl font-bold font-handlee text-dark mb-3 group-hover:text-primary transition-colors">{cls.title}</h4>
                  <p className="text-gray-600 text-[13px] leading-relaxed mb-0 font-medium">{cls.desc}</p>
                </div>
                <div className="bg-white p-0 flex-grow">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] w-[45%]">Medium</td>
                        <td className="p-3 font-medium text-gray-600">{cls.medium}</td>
                      </tr>
                      {cls.parallel && (
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Parallel Class</td>
                          <td className="p-3 font-medium text-gray-600">{cls.parallel}</td>
                        </tr>
                      )}
                      {cls.academic && (
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Academic</td>
                          <td className="p-3 font-medium text-gray-600">{cls.academic}</td>
                        </tr>
                      )}
                      {cls.vocational && (
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Vocational</td>
                          <td className="p-3 font-medium text-gray-600">{cls.vocational}</td>
                        </tr>
                      )}
                      {cls.optional && (
                        <tr className="border-b border-gray-100">
                          <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Optional</td>
                          <td className="p-3 font-medium text-gray-600">{cls.optional}</td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-100">
                        <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Daily Periods</td>
                        <td className="p-3 font-medium text-gray-600">{cls.periods || '08 Periods'}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">{cls.nvq ? 'NVQ' : 'Extracurricular'}</td>
                        <td className="p-3 font-bold text-primary">Available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 flex justify-center bg-gray-50 border-t border-gray-100">
                  <Link href="/classes">
                    <Button className="w-full">More Info</Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
