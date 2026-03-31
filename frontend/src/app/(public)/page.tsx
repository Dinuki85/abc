import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  Calendar, 
  User, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans overflow-hidden">
      
      {/* 1. Hero / Header Section */}
      <section className="relative bg-primary pt-20 pb-20 lg:pt-32 lg:pb-32 px-4 md:px-8 overflow-hidden">
        {/* Subtle pattern or overlay could go here */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-8 border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h4 className="text-white text-xl font-medium tracking-wide uppercase">Welcome to</h4>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              WP/NG/ Andiambalama Maha Vidyalaya
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to our vibrant school community! We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning, growth, and exciting opportunities. Our website serves as a gateway to the heart of our educational community, offering valuable insights into our rich history, vibrant culture, and diverse array of academic and extracurricular programs.
            </p>
            <div className="pt-4">
              <Link href="/about">
                <Button size="lg" className="bg-secondary hover:bg-secondary-hover text-dark border-none font-bold px-10 py-4 shadow-lg rounded-sm text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
               <Image 
                src="/img/header.png" 
                alt="AMV School Kids" 
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Play Ground', desc: 'A vibrant space where students can unleash their imagination, develop social skills, and engage in healthy physical activity.', icon: '🏗️' },
              { title: 'Aesthetic Units', desc: 'Offer students a dynamic platform to explore the world by getting experiences from different types of art, music, drama & Theater, and dance.', icon: '🎨' },
              { title: 'Smart Classroom', desc: 'Opportunities for learning and exploration, where technology meets education to inspire, engage, and empower the leaders of tomorrow.', icon: '💻' },
              { title: 'Auditoriums', desc: 'Our Indoor, Outdoor Auditoriums serves as dynamic hubs for creativity, performance, and community gatherings.', icon: '🎭' },
              { title: 'Laboratories', desc: "Our Mahindodaya and other STEM laboratories provide hands-on experiences that ignite student's passion for inquiry and innovation.", icon: '🔬' },
              { title: 'Library, Learning Units', desc: 'Where the pursuit of knowledge knows no bounds and every student has the opportunity to reach their fullest potential.', icon: '📚' }
            ].map((facility, i) => (
              <div key={i} className="flex gap-6 p-8 bg-light rounded-sm border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <span className="text-5xl shrink-0 group-hover:scale-110 transition-transform duration-300">{facility.icon}</span>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-dark">{facility.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-5/12">
              <div className="relative rounded-lg overflow-hidden shadow-2xl ring-8 ring-light">
                <Image 
                  src="/img/about-1.jpg" 
                  alt="Students learning" 
                  width={600} 
                  height={450} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="lg:w-7/12 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">Learn About Us</span>
                </div>
                <h2 className="text-4xl font-extrabold text-dark tracking-tight">Best School For Your Kids</h2>
                <p className="text-gray-600 leading-relaxed text-lg italic">
                  Delve into the vibrant history of Andiambalama Maha Vidyalaya, a beacon of educational excellence nestled in the heart of Andiambalama. Established in During the British colonial period, our school has been a cornerstone of the community for generations, shaping the minds and futures of countless students over the years.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  From humble beginnings to our current status as a renowned educational institution, our journey has been marked by dedication, innovation, and a steadfast commitment to nurturing the intellectual, social, and emotional growth of our students as wel as...
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <Image 
                    src="/img/about-2.jpg" 
                    alt="School Event" 
                    width={300} 
                    height={200} 
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <ul className="space-y-3">
                    {['Academic Excellence', 'Critical Thinking and Problem-Solving Skills', 'Responsibility and Work Ethic'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-dark font-medium border-b border-gray-100 pb-2 last:border-0">
                        <CheckCircle2 className="text-primary shrink-0" size={20} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Link href="/about" className="inline-block">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-sm shadow-md">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Classes/Academic Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm italic">Academic</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-4xl font-extrabold text-dark tracking-tight">Classes for Our Students</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Grade 6 - 9', 
                img: 'class-1.jpg', 
                desc: 'A diverse range of subjects, including mathematics, science, IT, social studies, and religious education with extracurricular activities.',
                details: [
                  { label: 'Medium', value: 'Sinhala/English' },
                  { label: 'Parallel Class', value: '04 Classes' },
                  { label: 'Daily Periods', value: '08 Periods' },
                  { label: 'Extracurricular', value: 'Available' }
                ]
              },
              { 
                title: 'Grade 10 - 11', 
                img: 'class-2.jpg', 
                desc: 'Preparing for General Certificate of Education Ordinary Level (G.C.E. O/L) examinations, which are a significant milestone in their academic journey.',
                details: [
                  { label: 'Medium', value: 'Sinhala/English' },
                  { label: 'Parallel Class', value: '03 Classes' },
                  { label: 'Daily Periods', value: '08 Periods' },
                  { label: 'Extracurricular', value: 'Available' }
                ]
              },
              { 
                title: 'Advanced Level - Mathematics', 
                img: 'class-3.jpg', 
                desc: 'Syllabus aims to provide a strong foundation in mathematics, Physics, Chemistry and IT to pursuing further studies in engineering related fields.',
                details: [
                  { label: 'Medium', value: 'Sinhala' },
                  { label: 'Optional', value: 'IT' },
                  { label: 'Daily Periods', value: '08 Periods' },
                  { label: 'Extracurricular', value: 'Available' }
                ]
              },
              { 
                title: 'Advanced Level - Commerce', 
                img: 'class-4.jpg', 
                desc: 'AL Commerce curriculum typically includes subjects like Accounting, Business Studies, Economics, and sometimes subjects like Mathematics and Statistics.',
                details: [
                  { label: 'Medium', value: 'Sinhala' },
                  { label: 'Optional', value: 'IT' },
                  { label: 'Daily Periods', value: '08 Periods' },
                  { label: 'Extracurricular', value: 'Available' }
                ]
              },
              { 
                title: 'Advanced Level - Arts', 
                img: 'class-5.jpg', 
                desc: 'Stream prepares students for higher education in fields such as social sciences, humanities, law, education, and arts-related disciplines.',
                details: [
                  { label: 'Medium', value: 'Sinhala' },
                  { label: 'Optional', value: 'IT & More' },
                  { label: 'Daily Periods', value: '08 Periods' },
                  { label: 'Extracurricular', value: 'Available' }
                ]
              },
              { 
                title: '13 Years Guaranteed Education', 
                img: 'class-6.jpg', 
                desc: 'Endeavors to empower its youth with the skills and knowledge necessary for personal development and national progress.',
                details: [
                  { label: 'Medium', value: 'Sinhala' },
                  { label: 'Academic', value: '1 1/2 Years' },
                  { label: 'Vocational', value: '06 Months' },
                  { label: 'NVQ', value: 'Available' }
                ]
              }
            ].map((cls, i) => (
              <div key={i} className="flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={`/img/${cls.img}`} 
                    alt={cls.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-dark text-center">{cls.title}</h4>
                    <p className="text-gray-500 text-sm text-center line-clamp-3">{cls.desc}</p>
                  </div>
                  
                  <div className="space-y-2 border-t border-gray-100 pt-6">
                    {cls.details.map((detail, di) => (
                      <div key={di} className="flex justify-between text-sm py-1 border-b border-gray-50 border-dashed last:border-0">
                        <span className="font-bold text-dark uppercase">{detail.label}</span>
                        <span className="text-gray-600">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 flex justify-center">
                    <Link href="/classes">
                      <Button className="bg-primary hover:bg-primary-hover text-white px-8 rounded-full font-bold">
                        More Information
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Enrollment Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-3xl p-10 md:p-20 relative overflow-hidden ring-1 ring-primary/10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary"></div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">School Enrollment</span>
                </div>
                <h2 className="text-5xl font-extrabold text-dark tracking-tight">Application Calling</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                  WP/NG Andiambalam Maha Vidyalaya is classified as a 1AB school by the Ministry of Education. Accordingly, applications are invited for the admission of children to Andiambalam Maha Vidyalaya on 03 occasions. You can also apply in the following cases:
                </p>
              </div>
              
              <ul className="space-y-4">
                {['Grade 06 Enrollment', 'Advance Level Enrollment', '13 Years Guaranteed Education Enrollment'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-dark font-bold text-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Link href="/classes">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-extrabold px-12 py-4 shadow-xl rounded-md text-xl">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-5/12 relative">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-[12px] ring-white">
                <Image 
                  src="/img/about-1.jpg" 
                  alt="Students learning" 
                  width={600} 
                  height={600} 
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Team / Principals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm italic">Our School Administrations</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-4xl font-extrabold text-dark tracking-tight">Meet Our Principals</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { name: 'A.V.D.S. Amarasena', role: 'The Principal', img: 'team-1.jpg' },
              { name: 'A.M.A.C. Adhikari', role: 'The Vice Principal', img: 'team-2.jpg' },
              { name: 'Ann Thamel Perera', role: 'The Assistant Principal', img: 'team-3.jpg' },
              { name: 'C.M. Liyanage', role: 'The Assistant Principal', img: 'team-4.jpg' }
            ].map((leader, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="relative mx-auto w-64 aspect-square rounded-full overflow-hidden shadow-xl border-4 border-light group-hover:ring-4 ring-primary transition-all duration-300">
                  <Image 
                    src={`/img/${leader.img}`} 
                    alt={leader.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-dark tracking-tight">{leader.name}</h4>
                  <p className="text-primary font-bold italic text-sm">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sports/Co-Curricular Section */}
      <section className="py-24 bg-light overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm italic">Sports</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-4xl font-extrabold text-dark tracking-tight">Students Can Enroll</h2>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar group">
            {[
              { 
                sport: 'Cricket & Elle', 
                img: 'testimonial-1.jpg', 
                incharge: 'Mr. Sampath', 
                role: 'Incharge',
                desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
              },
              { 
                sport: 'Netball', 
                img: 'testimonial-2.jpg', 
                incharge: 'Ms. Gayani', 
                role: 'Incharge',
                desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and only for girls.'
              },
              { 
                sport: 'Volleyball', 
                img: 'testimonial-3.jpg', 
                incharge: 'Mr. Saman', 
                role: 'Coach',
                desc: 'Any Student can enroll to either Under 14, Under 16, Under 18 and Under 20 As per the student age limit and Gender Basis.'
              },
              { 
                sport: 'Taekwondo', 
                img: 'testimonial-4.jpg', 
                incharge: 'Major Rathnayaka', 
                role: 'Coach',
                desc: 'Students can select Taekwondo to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
              },
              { 
                sport: 'Karate', 
                img: 'testimonial-5.jpg', 
                incharge: 'Mr. Dias', 
                role: 'Incharge',
                desc: 'Students can select Karate to practice as another co-curriculer activity. Any Student can enroll without age limit and Gender Basis.'
              }
            ].map((sport, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] flex flex-col bg-white rounded-xl shadow-lg p-8 snap-center space-y-6 relative border-b-8 border-primary hover:-translate-y-2 transition-all duration-300">
                <Quote className="absolute top-4 right-4 text-primary/10" size={60} />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <h4 className="text-2xl font-black text-dark tracking-tighter uppercase">{sport.sport}</h4>
                  <p className="text-gray-600 leading-relaxed italic text-sm">{sport.desc}</p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-light shrink-0 shadow-inner">
                    <Image src={`/img/${sport.img}`} alt={sport.incharge} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-dark text-lg">{sport.incharge}</span>
                    <span className="text-primary font-bold italic text-sm uppercase tracking-widest">{sport.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm italic">Latest News</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-5xl font-extrabold text-dark tracking-tight">Latest Updates of The Schools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Big Match With Kimbulapitiya Jeyaraj Pranandupulle MV', 
                img: 'blog-1.jpg', 
                tag: ['UP', 'COMING', 'EVENT'],
                desc: 'The school Big Match is sheduled with the Brotherhood School WP/NP Kimbulapitiya Jeyaraj Pranandupulle Maha Vidhyalaya, Kimbulapitiya. School cricket team will participate to this event in near future.'
              },
              { 
                title: 'Sinhala Hindu New Year Celebration', 
                img: 'blog-2.jpg', 
                tag: ['09', 'April', '2024'],
                desc: 'All the school academic, non-academic staff and student participate to celebration. Throughout the celebration, traditional games and activities bring communities together in joyous camaraderie.'
              },
              { 
                title: 'Suramya Geya sanhitha 2024 Musical Program', 
                img: 'blog-3.jpg', 
                tag: ['03', 'March', '2024'],
                desc: 'An entertaining and educational classical music program was held at the school outdoor auditorium to enhance the aesthetic enjoyment of the children under the initiative of Mr. Rodney Warnakula. Several types of stage songs were sung.'
              }
            ].map((news, i) => (
              <div key={i} className="flex flex-col bg-light rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group ring-1 ring-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={`/img/${news.img}`} 
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {news.tag.map(t => (
                      <span key={t} className="bg-primary text-white text-[10px] font-black px-2 py-1 uppercase rounded-sm border border-white/20">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4 grow">
                    <h4 className="text-xl font-black text-dark line-clamp-2 leading-tight group-hover:text-primary transition-colors cursor-pointer">{news.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">{news.desc}</p>
                  </div>
                  <div className="pt-6">
                    <Link href="/news">
                      <Button variant="ghost" className="w-full text-primary font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 border-primary/20 border hover:bg-primary hover:text-white transition-all group-2">
                        Read More <ArrowRight size={16} className="group-hover-2:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Ready to join WP/NG Andiambalama Maha Vidyalaya?</h2>
          <p className="text-white/80 text-xl font-medium">Explore our curriculum, download admission forms, and start your educational journey with us today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
             <Link href="/contact">
                <Button size="lg" className="bg-white text-primary font-bold px-10 rounded-sm hover:shadow-2xl transition-all">
                  Contact Us
                </Button>
             </Link>
             <Link href="/classes">
                <Button size="lg" className="bg-secondary text-dark font-bold px-10 rounded-sm hover:shadow-2xl transition-all">
                  Join Academics
                </Button>
             </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
