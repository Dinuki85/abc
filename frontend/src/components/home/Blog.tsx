import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const blogs = [
  { 
    title: 'Big Match With Kimbulapitiya Jeyaraj Pranandupulle MV', 
    img: 'blog-1.jpg', 
    tags: ['UP', 'COMMING', 'EVENT'],
    desc: 'The school Big Match is sheduled with the Brotherhood School WP/NP Kimbulapitiya Jeyaraj Pranandupulle Maha Vidhyalaya, Kimbulapitiya. School cricket team will participate to this event in near future.'
  },
  { 
    title: 'Sinhala Hindu New Year Celebration', 
    img: 'blog-2.jpg', 
    tags: ['09', 'April', '2024'],
    desc: 'All the school academic, non-academic staff and student participate to celebration. Throughout the celebration, traditional games and activities bring communities together in joyous camaraderie.'
  },
  { 
    title: 'Suramya Geya sanhitha 2024 Musical Program', 
    img: 'blog-3.jpg', 
    tags: ['03', 'March', '2024'],
    desc: 'An entertaining and educational classical music program was held at the school outdoor auditorium to enhance the aesthetic enjoyment of the children under the initiative of Mr. Rodney Warnakula. Several types of stage songs were sung.'
  }
];

export default function Blog() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              Latest News
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-dark font-handlee">Latest Updates of The Schools</h1>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Reveal key={i} width="100%">
              <div className="flex flex-col bg-white shadow-sm border border-gray-100 rounded overflow-hidden group h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={`/img/${blog.img}`} 
                    alt={blog.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8 bg-slate-50 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-4 line-clamp-2 leading-tight uppercase text-dark">{blog.title}</h4>
                    <div className="flex justify-center gap-3 mb-4">
                      {blog.tags.map(tag => (
                        <small key={tag} className="font-bold text-dark tracking-wider uppercase">{tag}</small>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">{blog.desc}</p>
                  </div>
                  <Link href="/news">
                    <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-sm font-bold shadow-sm uppercase text-xs mx-auto">
                      Read More
                    </Button>
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
