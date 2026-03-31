import Image from 'next/image';
import { 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  History, 
  Award,
  BookOpen,
  Users
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Page Header */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 border-[20px] border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">About Us</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic">
            We are thrilled to have you join us on our digital journey as we embark on our academic years fille with learning growth and exciting oppotunities.
          </p>
        </div>
      </section>

      {/* 2. Main Story / History Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 sticky top-32">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-100">
                <Image 
                  src="/img/about-1.jpg" 
                  alt="AMV History" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-8">
                  <span className="text-white font-bold flex items-center gap-2">
                    <History className="text-secondary" size={24} /> Established During British Colonial Period
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-light p-6 rounded-xl border-l-4 border-primary">
                  <h4 className="text-primary font-black text-3xl mb-1 tracking-tighter">1AB</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">School Category</p>
                </div>
                <div className="bg-light p-6 rounded-xl border-l-4 border-secondary">
                  <h4 className="text-dark font-black text-3xl mb-1 tracking-tighter">WP/NG</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Zonal / Division</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary"></div>
                  <span className="text-primary font-black uppercase tracking-widest text-sm">Our Legacy</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-none uppercase">Best School For Your Kids</h2>
                <div className="bg-light p-6 rounded-xl italic text-gray-600 text-lg border-l-4 border-gray-200">
                  Delve into the vibrant history of Andiambalama Maha Vidyalaya, a beacon of educational excellence nestled in the heart of Andiambalama. Established in During the British colonial period, our school has been a cornerstone of the community for generations, shaping the minds and futures of countless students over the years.
                </div>
              </div>
              
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                <p>
                  Originally founded to cater to the educational needs of the local community, Andiambalama Maha Vidyalaya has grown steadily over the years, evolving in both infrastructure and academic offerings. From humble beginnings, the school has expanded its facilities, curriculum, and extracurricular activities to provide a holistic learning experience to its students.
                </p>
                <p>
                  Throughout its journey, Andiambalama Maha Vidyalaya has witnessed significant milestones, reflecting the dedication and commitment of its educators, students, and stakeholders. These milestones may include achievements in academics, sports, cultural events, and community outreach programs.
                </p>
                <p>
                  As the school website serves as a digital gateway to its history, it can showcase these milestones through archived photographs, documents, testimonials, and narratives from alumni, faculty, and staff. This digital repository not only preserves the rich heritage of Andiambalama Maha Vidyalaya but also inspires current and future generations to uphold its legacy of excellence and service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <Image 
                  src="/img/about-2.jpg" 
                  alt="School milestone" 
                  width={400} 
                  height={300} 
                  className="rounded-xl shadow-lg ring-4 ring-light"
                />
                <ul className="space-y-4">
                  {['Academic Excellence', 'Critical Thinking Skills', 'Responsibility & Work Ethic'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-dark font-black tracking-tight text-lg border-b border-gray-100 pb-2 last:border-0">
                      <CheckCircle2 className="text-primary shrink-0" size={24} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary"></div>
                  <span className="text-primary font-black uppercase tracking-widest text-sm italic">Our Commitment</span>
                </div>
                <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <Target className="text-secondary group-hover:scale-110 transition-transform" size={40} />
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Vision</h2>
                  </div>
                  <p className="text-white text-2xl font-medium leading-relaxed italic border-l-4 border-secondary pl-6 py-2">
                    "Bequeathing to mother Lak a compassionate citizen nourished by the essence of Dharma and universal knowledge"
                  </p>
                </div>
                <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group mt-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Lightbulb className="text-primary group-hover:scale-110 transition-transform" size={40} />
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Mission</h2>
                  </div>
                  <p className="text-white text-xl leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                    "Creating noble human resources suitable for the motherland-loving universe through a set of quantitative, structural and qualitative positive changes in the knowledge, skills and attitudes of children."
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-secondary"></div>
                    <span className="text-secondary font-black uppercase tracking-widest text-sm italic">Hierarchy</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-[16px] ring-white/5">
                    <Image 
                      src="/img/class-5.jpg" 
                      alt="AMV Organizational Hierarchy" 
                      width={800} 
                      height={600} 
                      className="w-full h-auto brightness-90 hover:brightness-100 transition-all duration-500"
                    />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Detailed Facilities Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-5xl font-black text-dark tracking-tight uppercase">Excellence in Infrastructure</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">We provide world-class facilities designed to support the holistic development of our students across academic, artistic, and athletic fields.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              { 
                title: 'Play Ground', 
                icon: '🏗️',
                desc: 'A vibrant space where students can unleash their imagination, develop social skills, and engage in healthy physical activity.',
                extra: 'In particular, the 400-meter track has made a great contribution to improving the athletic abilities of our students. Additionally, it can be observed that students are constantly practicing on the age-level courts for boys\' and girls\' volleyball and netball games. The cricket field, purposefully built, greatly contributes to the development of the students\' sports skills'
              },
              { 
                title: 'Aesthetic Units', 
                icon: '🎨',
                desc: 'Offer students a dynamic platform to explore the world by getting experiences from different types of art, music, drama & Theater, and dance.',
                extra: 'In our well-equipped art studio, students unleash their creativity, experimenting with various mediums and techniques under the guidance of experienced teachers. Students hone musical skills through practice sessions & performances. Through group projects, theatrical productions, and dance performances, students learn the importance of cooperation and mutual support.'
              },
              { 
                title: 'Smart classroom', 
                icon: '💻',
                desc: 'Opportunities for learning and exploration, where technology meets education to inspire, engage, and empower the leaders of tomorrow.',
                extra: 'Equipped with interactive whiteboards, high-speed internet connectivity, and multimedia resources, our Smart Classroom fosters dynamic and engaging learning experiences. Students benefit from personalized instruction, collaborative projects, and real-time feedback, enhancing their comprehension and retention.'
              },
              { 
                title: 'Auditoriums', 
                icon: '🎭',
                desc: 'Our Indoor, Outdoor Auditoriums serves as dynamic hubs for creativity, performance, and community gatherings.',
                extra: 'Designed with state-of-the-art acoustics and plush seating, our indoor venue provides the perfect setting for conferences, seminars, concerts, and theatrical performances. As wel as open-air venue offers a unique setting for events of all kinds.'
              },
              { 
                title: 'Laboratories', 
                icon: '🔬',
                desc: 'Our Mahindodaya and other STEM laboratories provide hands-on experiences that ignite student\'s passion for inquiry and innovation.',
                extra: 'Among the labs, Ol Science lab, Mahindodaya labs (Computer lab, Language lab, A/L Maths lab, Nanasa lab), and an innovative lab equipped with modern equipment are set up to fulfill the aspirations of the students.'
              },
              { 
                title: 'Library, Learning Units', 
                icon: '📚',
                desc: 'Where the pursuit of knowledge knows no bounds and every student has the opportunity to reach their fullest potential.',
                extra: 'Whether you\'re a student seeking to expand your knowledge or an educator looking for supplementary materials, our library provides a rich and dynamic learning experience for users of all ages and backgrounds.'
              }
            ].map((facility, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start ring-1 ring-gray-100">
                <span className="text-6xl p-4 bg-light rounded-2xl shrink-0">{facility.icon}</span>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-dark tracking-tight uppercase">{facility.title}</h4>
                  <p className="text-gray-600 font-bold leading-relaxed">{facility.desc}</p>
                  <p className="text-gray-400 text-sm italic border-t border-gray-100 pt-4 leading-relaxed">{facility.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
