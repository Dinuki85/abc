import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Carousel from '@/components/ui/Carousel';
import { Button } from '@/components/ui/Button';
import { Search, ChevronRight, User, MessageCircle, MoreVertical } from 'lucide-react';

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader 
        title="Our Sports & Athletics" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning, growth & exciting opportunities."
      />

      <section className="container-custom py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Detail Start (Main Content) */}
          <div className="lg:w-2/3">
            <Reveal>
              <div className="flex flex-col text-left mb-6">
                <SectionTitle subtitle="AMV Sports" title="Cricket" alignment="left" />
                <div className="flex flex-wrap gap-4 text-gray-500 font-bold text-sm mt-2 mb-4 border-y border-gray-100 py-3">
                  <span className="flex items-center gap-1"><User size={14} className="text-primary" /> Ms. Gayani Teacher Incharge</span>
                  <span className="flex items-center gap-1"><User size={14} className="text-secondary" /> Mr. Sampath</span>
                  <span className="flex items-center gap-1">Coach</span>
                </div>
              </div>
            </Reveal>

            <div className="mb-12">
              <Reveal delay={0.1}>
                <div className="relative h-[450px] w-full rounded-2xl overflow-hidden mb-8 shadow-professional">
                  <Image 
                    src="/img/detail.jpg" 
                    alt="Cricket" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
                  <p>
                    Sri Lankan school cricket is deeply ingrained in the country's sporting culture, serving as a crucial platform for nurturing young talent. It's a vibrant & competitive scene, with numerous schools across the island participating in various tournaments & leagues. Schools like St. Joseph's College, Royal College & Trinity College have historically been powerhouse teams. The schools cricket season typically runs from September to April, featuring both traditional formats & limited-overs cricket.
                  </p>
                  <p>
                    Many Sri Lankan cricket stars, including Muttiah Muralitharan and Kumar Sangakkara, honed their skills playing school cricket before making it to the national team. The schools cricket structure plays a pivotal role in identifying and grooming future cricketing talents for Sri Lanka.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mb-12 overflow-hidden">
                  <h2 className="text-4xl font-bold font-handlee text-dark mb-6">Elle</h2>
                  <div className="relative w-full md:w-1/2 h-64 md:float-left md:mr-8 mb-6 rounded-2xl overflow-hidden shadow-professional group">
                    <Image 
                      src="/img/blog-1.jpg" 
                      alt="Elle" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed prose-lg">
                    Sri Lankan school Elle, also known as "Lankarama," is a traditional game deeply rooted in the island's culture. It's a team sport resembling a mix of baseball & cricket, played with a ball made of stitched coconut husk & a bat called a "wambey." The objective is to hit the ball thrown by the opposing team & score runs by running between two designated points. Elle is often played in schoolyards & open spaces, fostering teamwork, coordination & physical fitness among participants. While not as widely recognized internationally as cricket, Elle holds significant cultural importance in Sri Lanka, reflecting the nation's rich heritage & love for indigenous games.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mb-12 overflow-hidden border-t border-gray-100 pt-12">
                  <h2 className="text-4xl font-bold font-handlee text-dark mb-6 text-right">Volleyball</h2>
                  <div className="relative w-full md:w-1/2 h-64 md:float-right md:ml-8 mb-6 rounded-2xl overflow-hidden shadow-professional group">
                    <Image 
                      src="/img/blog-2.jpg" 
                      alt="Volleyball" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed prose-lg text-right md:text-left">
                    Sri Lankan school volleyball is a prominent fixture within the country's sports landscape, offering a platform for young athletes to showcase their talents and passion for the game. Volleyball enjoys widespread popularity across schools in Sri Lanka, with both boys' and girls' teams participating in various competitions at local, regional, and national levels.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Related Posts Carousel */}
            <Reveal delay={0.4}>
              <div className="mb-16 py-12 border-t border-b border-gray-100">
                <h2 className="text-3xl font-bold font-handlee text-dark mb-8 uppercase tracking-widest">RELATED POSTS</h2>
                <Carousel 
                  showDots={true} 
                  autoPlay={true} 
                  interval={4000} 
                  itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }}
                >
                  {[
                    { title: 'Traditional Game', sub: 'MAIN HALL', date: 'AT SCHOOL', img: 'post-1.jpg' },
                    { title: 'Student Parliment', sub: 'MAIN HALL', date: 'AT SCHOOL', img: 'post-2.jpg' },
                    { title: 'Reading competition', sub: 'MAIN HALL', date: 'AT SCHOOL', img: 'post-3.jpg' }
                  ].map((post, idx) => (
                    <div key={idx} className="flex align-items-center bg-slate-50 shadow-sm rounded-[3rem] overflow-hidden group hover:bg-primary transition-all duration-500">
                      <div className="relative w-32 h-32 shrink-0 overflow-hidden">
                        <Image src={`/img/${post.img}`} alt={post.title} fill sizes="128px" className="object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="p-6">
                        <h5 className="text-xl font-bold text-dark group-hover:text-white transition-colors">{post.title}</h5>
                        <div className="flex gap-2 text-xs font-bold text-gray-400 group-hover:text-white/60 transition-colors mt-2 tracking-widest">
                          <span>{post.date}</span>
                          <span>{post.sub}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Reveal>

            {/* Comment Area Simulation (Teacher Incharge Message) */}
            <Reveal delay={0.5}>
              <div className="mb-16">
                <h2 className="text-3xl font-bold font-handlee text-dark mb-10">Teacher Incharge Sport Message</h2>
                <div className="space-y-8">
                  {[1, 2].map((m, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-md ring-4 ring-gray-50">
                        <Image src="/img/user.jpg" alt="User" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h6 className="font-bold text-lg text-gray-800">Ms. Gayani</h6>
                          <span className="text-xs text-gray-400 font-bold italic">{i === 0 ? '01 Jan 2024 at 12:00pm' : '21 Jan 2024 at 12:00pm'}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-normal bg-gray-50 p-6 rounded-2xl rounded-tl-none border border-gray-100 shadow-inner italic">
                          "Congratulations to our phenomenal karate team for clinching the prestigious 1st place title at The Island School Karate Championship! Your dedication, discipline, and sheer determination have led us to this incredible victory... Well done, champions!"
                        </p>
                        <button className="text-primary font-bold text-xs uppercase tracking-widest mt-3 hover:underline">Reply</button>
                        
                        {i === 1 && (
                          <div className="flex gap-6 mt-8 pl-8 border-l-2 border-gray-100">
                             <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm ring-2 ring-gray-50">
                                <Image src="/img/user.jpg" alt="User" fill sizes="48px" className="object-cover" />
                              </div>
                              <div className="flex-grow">
                                <h6 className="font-bold text-sm text-gray-800">Ms. Gayani <span className="text-[10px] text-gray-400 ml-2 italic">21 Jan 2024 at 12:00pm</span></h6>
                                <p className="text-gray-600 text-sm mt-1 bg-white p-4 border border-gray-100 shadow-sm rounded-xl rounded-tl-none">
                                  "Congratulations to our phenomenal karate team... well done, champions!"
                                </p>
                              </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Comment Form */}
            <Reveal delay={0.6}>
              <div className="bg-slate-50 rounded-3xl p-10 border border-gray-100 mb-20 shadow-inner">
                <h2 className="text-3xl font-bold font-handlee text-dark mb-8">Leave a comment</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Name *</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Email *</label>
                    <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Website</label>
                    <input type="url" className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-600 uppercase tracking-widest">Message *</label>
                    <textarea rows={5} className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none resize-none" />
                  </div>
                  <div className="md:col-span-2 text-center md:text-left">
                    <Button type="button" size="lg" className="px-12 font-bold uppercase tracking-widest">Leave Comment</Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-12">
            
            {/* Author Bio */}
            <Reveal delay={0.2}>
              <div className="bg-primary rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 -mr-10 -mt-10"></div>
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl z-10">
                  <Image src="/img/user.jpg" alt="Author" fill sizes="128px" className="object-cover" />
                </div>
                <h3 className="text-3xl font-bold font-handlee mb-3 relative z-10">Ms. Gayani Udarika</h3>
                <p className="text-white font-medium prose-sm relative z-10">
                  As the Sports Teacher Incharge at AMV, She will play a pivotal role in promoting physical fitness, teamwork, and sportsmanship among our students.
                </p>
              </div>
            </Reveal>

            {/* Recent Posts with more detail */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-3xl p-8 shadow-professional border border-gray-100">
                <h2 className="text-2xl font-bold font-handlee text-dark mb-8 border-b-2 border-primary/20 pb-4">Recent Post</h2>
                <div className="space-y-6">
                  {[
                    { title: 'New Year', sub: 'New year', loc: 'Festival', img: 'post-1.jpg' },
                    { title: 'Student Parliment', sub: 'School', loc: 'Main Hall', img: 'post-2.jpg' },
                    { title: 'Reading Competition', sub: 'School', loc: 'Main Hall', img: 'post-3.jpg' }
                  ].map((post, i) => (
                    <div key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-slate-50 rounded-2xl transition-all">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm ring-1 ring-gray-100">
                        <Image src={`/img/${post.img}`} alt={post.title} fill sizes="80px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 group-hover:text-primary transition-colors text-sm underline decoration-primary/0 group-hover:decoration-primary/50 underline-offset-4">{post.title}</h5>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded capitalize">At {post.sub}</span>
                          <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded capitalize">{post.loc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Categories */}
            <Reveal delay={0.4}>
              <div className="bg-white rounded-3xl p-8 shadow-professional border border-gray-100">
                <h2 className="text-2xl font-bold font-handlee text-dark mb-8 text-center bg-slate-50 py-3 rounded-2xl">Categories</h2>
                <ul className="space-y-4">
                  {[
                    { name: 'Cricket', count: 150 },
                    { name: 'Netball', count: 131 },
                    { name: 'Volleyball', count: 78 },
                    { name: 'Taekwondo', count: 56 },
                    { name: 'Karate', count: 98 },
                  ].map((c, i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer border-b border-gray-50 pb-2 hover:pl-2 transition-all">
                      <span className="text-gray-600 font-bold group-hover:text-primary capitalize">{c.name}</span>
                      <span className="bg-primary text-white text-[10px] font-black w-8 h-8 rounded-full flex items-center justify-center shadow-professional group-hover:scale-110 transition-all">{c.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Tag Cloud */}
            <Reveal delay={0.5}>
              <div className="bg-white rounded-3xl p-8 shadow-professional border border-gray-100">
                <h3 className="text-3xl font-bold font-handlee text-dark mb-6">Tag Cloud</h3>
                <div className="flex flex-wrap gap-2">
                  {['Cricket', 'Netball', 'Volleyball', 'Taekwondo', 'Karate', 'Other'].map((tag, idx) => (
                    <Link 
                      href="#" 
                      key={idx}
                      className="px-5 py-2 border border-primary text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Program Image & Text */}
            <Reveal delay={0.6}>
              <div className="space-y-6">
                <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-professional group">
                  <Image src="/img/blog-3.jpg" alt="Suramya Geya" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-2">
                  <h2 className="text-3xl font-bold font-handlee text-dark mb-4">Suramya Geya sanhitha 2024</h2>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    An entertaining and educational classical music program was held at the school outdoor auditorium to enhance the aesthetic enjoyment of the children under the initiative of Mr. Rodney Warnakula. Several types of stage songs were sung.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </main>
  );
}

