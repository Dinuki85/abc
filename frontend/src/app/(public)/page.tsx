import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  Quote, 
  ChevronRight,
  Music,
  Layout,
  Monitor,
  Theater,
  FlaskConical,
  Library,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import Carousel from '@/components/ui/Carousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. Header Section */}
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
                  className="w-full h-auto mt-5"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Facilities Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Reveal width="100%">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Excellence</span>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-dark font-handlee">School Facilities</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Play Ground', desc: 'A vibrant space where students can unleash their imagination, develop social skills, and engage in healthy physical activity.', icon: <Layout className="text-primary w-12 h-12" /> },
              { title: 'Aesthetic Units', desc: 'offer students a dynamic platform to explore the world by getting experiences from different types of art, music, drama & Theater, and dance.', icon: <Music className="text-primary w-12 h-12" /> },
              { title: 'Smart Classroom', desc: 'opportunities for learning and exploration, where technology meets education to inspire, engage, and empower the leaders of tomorrow.', icon: <Monitor className="text-primary w-12 h-12" /> },
              { title: 'Auditoriums', desc: 'Our Indoor, Outdoor Auditoriums serves as dynamic hubs for creativity, performance, and community gatherings.', icon: <Theater className="text-primary w-12 h-12" /> },
              { title: 'laboratories', desc: "Our Mahindodaya and other STEM laboratories provide hands-on experiences that ignite student's passion for inquiry and innovation.", icon: <FlaskConical className="text-primary w-12 h-12" /> },
              { title: 'Library, Learning Units', desc: 'where the pursuit of knowledge knows no bounds and every student has the opportunity to reach their fullest potential.', icon: <Library className="text-primary w-12 h-12" /> }
            ].map((facility, i) => (
              <Reveal key={i} width="100%" delay={i * 0.1}>
                <div className="group bg-white hover:bg-primary transition-all duration-500 shadow-sm hover:shadow-xl border border-gray-100 rounded-3xl p-10 mb-4 h-full flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-white/10 transition-colors"></div>
                  <div className="mb-6 p-4 rounded-2xl bg-primary/5 group-hover:bg-white/20 transition-colors transform group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-inner">
                    {React.cloneElement(facility.icon as React.ReactElement<{ className?: string }>, { className: 'w-12 h-12 text-primary group-hover:text-white transition-colors duration-500' })}
                  </div>
                  <div className="space-y-3 relative z-10">
                    <h4 className="text-2xl font-bold text-dark group-hover:text-white transition-colors duration-500 font-handlee">{facility.title}</h4>
                    <div className="w-12 h-1 bg-primary/20 group-hover:bg-white/40 mx-auto rounded-full transition-all duration-500 group-hover:w-20"></div>
                    <p className="text-gray-600 group-hover:text-white/90 text-center leading-relaxed font-medium transition-colors duration-500">{facility.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section */}
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
                    <Image src="/img/about-2.jpg" alt="Awards" width={300} height={200} className="w-full h-auto rounded" />
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

      {/* 4. Academic Section */}
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
            {[
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
            ].map((cls, i) => (
              <Reveal key={i} width="100%">
                <div className="flex flex-col bg-white rounded-xl shadow-professional hover:shadow-professional-hover overflow-hidden border border-gray-100 h-full transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <Image src={`/img/${cls.img}`} alt={cls.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
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

      {/* 5. Enrollment Section */}
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
                  className="w-full rounded shadow-sm"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal width="100%">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Our School Administrations</span>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-dark font-handlee">Meet Our Principals</h1>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'A.V.D.S. AMarasena', role: 'The Principal', img: 'team-1.jpg' },
              { name: 'A.M.A.C. Adhikari', role: 'The Vise Principal', img: 'team-2.jpg' },
              { name: 'Ann Thamel Perera', role: 'The Assistant Principal', img: 'team-3.jpg' },
              { name: 'C.M. Liyanage', role: 'The Assistant Principal', img: 'team-4.jpg' }
            ].map((p, i) => (
              <Reveal key={i} width="100%">
                <div className="text-center group">
                  <div className="relative w-full aspect-square mb-6 rounded-full overflow-hidden shadow-sm ring-2 ring-gray-100 group-hover:ring-4 group-hover:ring-primary group-hover:ring-offset-2 transition-all duration-300">
                    <Image 
                      src={`/img/${p.img}`} 
                      alt={p.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-dark uppercase tracking-tight">{p.name}</h4>
                  <p className="text-gray-500 italic text-sm">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sports Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal width="100%">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Sports</span>
                <div className="h-0.5 w-12 bg-primary/30 rounded-full"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-dark font-handlee">Student Can Enroll</h1>
            </div>
          </Reveal>

          <Reveal width="100%">
            <Carousel 
              showDots={true} 
              autoPlay={true} 
              interval={4000} 
              itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            >
              {[
                { 
                  sport: 'Cricket & Elle', 
                  img: 'testimonial-1.jpg', 
                  incharge: 'Mr.Sampath', 
                  role: 'Incharge',
                  desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
                },
                { 
                  sport: 'Netball', 
                  img: 'testimonial-2.jpg', 
                  incharge: 'Ms.Gayani', 
                  role: 'Incharge',
                  desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and only for girls.'
                },
                { 
                  sport: 'Volleyball', 
                  img: 'testimonial-3.jpg', 
                  incharge: 'Mr.Saman', 
                  role: 'Coach',
                  desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
                },
                { 
                  sport: 'Taekwondo', 
                  img: 'testimonial-4.jpg', 
                  incharge: 'Major Rathnayaka', 
                  role: 'Coach',
                  desc: 'students can select Taekwondo to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
                },
                { 
                  sport: 'Karate', 
                  img: 'testimonial-5.jpg', 
                  incharge: 'Mr.Dias', 
                  role: 'Incharge',
                  desc: 'students can select Karate to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
                }
              ].map((sport, i) => (
                <div key={i} className="flex flex-col h-full space-y-8 px-2 py-4 group">
                  <div className="bg-white shadow-professional rounded-3xl p-10 flex-grow relative border-t-4 border-white group-hover:border-primary transition-all duration-500">
                    <Quote className="text-primary w-12 h-12 mb-4" />
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4 text-gray-700 font-handlee group-hover:text-primary transition-colors">{sport.sport}</h4>
                      <p className="text-gray-500 leading-relaxed text-lg font-medium line-clamp-4">{sport.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 px-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-transparent group-hover:ring-primary transition-all duration-500">
                      <Image src={`/img/${sport.img}`} alt={sport.incharge} fill sizes="96px" className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-dark text-2xl font-handlee group-hover:text-primary transition-colors">{sport.incharge}</h5>
                      <p className="text-gray-500 italic text-lg font-medium">{sport.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* 8. Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal width="100%">
            <div className="text-center mb-12">
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
                <span className="px-5 border-l-4 border-r-4 border-primary">Latest News</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-dark font-handlee">Latest Updates of The Schools</h1>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((blog, i) => (
              <Reveal key={i} width="100%">
                <div className="flex flex-col bg-white shadow-sm border border-gray-100 rounded overflow-hidden group h-full">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={`/img/${blog.img}`} alt={blog.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
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

    </div>
  );
}
