import Image from 'next/image';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Check, Castle, Music, MonitorPlay, Mic2, FlaskConical, Library } from 'lucide-react';

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
  ];

  const facilities = [
    {
      title: 'Play Ground',
      description: 'A vibrant space where students can unleash their imagination, develop social skills, and engage in healthy physical activity.',
      details: 'In particular, the 400-meter track has made a great contribution to improving the athletic abilities of our students. Additionally, it can be observed that students are constantly practicing on the age-level courts for boys\' and girls\' volleyball and netball games. The cricket field, purposefully built, greatly contributes to the development of the students\' sports skills.',
      icon: <Castle className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <Castle className="w-10 h-10 text-primary mb-4" />
    },
    {
      title: 'Aesthetic Units',
      description: 'Offer students a dynamic platform to explore the world by getting experiences from different types of art, music, drama & Theater, and dance.',
      details: 'In our well-equipped art studio, students unleash their creativity, experimenting with various mediums and techniques under the guidance of experienced teachers. Students hone musical skills through practice sessions & performances. Through group projects, theatrical productions, and dance performances, students learn the importance of cooperation, mutual support, and enriching experiences.',
      icon: <Music className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <Music className="w-10 h-10 text-primary mb-4" />
    },
    {
      title: 'Smart Classroom',
      description: 'Opportunities for learning and exploration, where technology meets education to inspire, engage, and empower the leaders of tomorrow.',
      details: 'Equipped with interactive whiteboards, high-speed internet connectivity, and multimedia resources, our Smart Classroom fosters dynamic and engaging learning experiences. Students benefit from personalized instruction, collaborative projects, and real-time feedback, enhancing their comprehension and retention.',
      icon: <MonitorPlay className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <MonitorPlay className="w-10 h-10 text-primary mb-4" />
    },
    {
      title: 'Auditoriums',
      description: 'Our Indoor and Outdoor Auditoriums serve as dynamic hubs for creativity, performance, and community gatherings.',
      details: 'Designed with state-of-the-art acoustics and plush seating, our indoor venue provides the perfect setting for conferences, seminars, concerts, and theatrical performances. The open-air venue offers a unique setting for events of all kinds.',
      icon: <Mic2 className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <Mic2 className="w-10 h-10 text-primary mb-4" />
    },
    {
      title: 'Laboratories',
      description: 'Our STEM laboratories provide hands-on experiences that ignite student\'s passion for inquiry and innovation.',
      details: 'Among the labs, the O/L Science lab, Mahindodaya labs (Computer lab, Language lab, A/L Maths lab, Nanasa lab), and an Innovative lab equipped with modern equipment are set up to fulfill the aspirations of the students.',
      icon: <FlaskConical className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <FlaskConical className="w-10 h-10 text-primary mb-4" />
    },
    {
      title: 'Library',
      description: 'Where the pursuit of knowledge knows no bounds and every student has the opportunity to reach their fullest potential.',
      details: 'Whether you\'re a student seeking to expand your knowledge or an educator looking for supplementary materials, our library provides a rich and dynamic learning experience for users of all ages and backgrounds.',
      icon: <Library className="w-12 h-12 text-primary absolute opacity-20 -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-300" />,
      mainIcon: <Library className="w-10 h-10 text-primary mb-4" />
    }
  ];

  const principals = [
    { name: 'A.V.D.S. Amarasena', role: 'The Principal', img: '/img/team-1.jpg' },
    { name: 'A.M.A.C. Adhikari', role: 'The Vice Principal', img: '/img/team-2.jpg' },
    { name: 'Anne Thamel', role: 'Assistant Principal', img: '/img/team-3.jpg' },
    { name: 'C.M. Liyanage', role: 'Assistant Principal', img: '/img/team-4.jpg' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PageHeader 
        title="About Us" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities."
        breadcrumbs={breadcrumbs}
      />

      {/* About Section */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="relative group rounded-2xl overflow-hidden shadow-professional mt-4">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <Image 
                src="/img/about-1.jpg" 
                alt="About AMV" 
                width={800} 
                height={600} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <SectionTitle subtitle="Learn About Us" title="Best School For Your Kids" alignment="left" />
              
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                <p>
                  Delve into the vibrant history of Andiambalama Maha Vidyalaya, a beacon of educational excellence nestled in the heart of Andiambalama. Established during the British colonial period, our school has been a cornerstone of the community for generations, shaping the minds and futures of countless students over the years.
                </p>
                <p>
                  Originally founded to cater to the educational needs of the local community, Andiambalama Maha Vidyalaya has grown steadily over the years, evolving in both infrastructure and academic offerings. From humble beginnings, the school has expanded its facilities, curriculum, and extracurricular activities to provide a holistic learning experience to its students.
                </p>
                <p>
                  Throughout its journey, the school has witnessed significant milestones, reflecting the dedication and commitment of its educators, students, and stakeholders. As this website serves as a digital gateway to its history, it aims to preserve the rich heritage of AMV and inspire future generations to uphold its legacy of excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <div className="col-span-1 rounded-xl overflow-hidden shadow-md">
                  <Image 
                    src="/img/about-2.jpg" 
                    alt="Students learning" 
                    width={400} 
                    height={300} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-col justify-center">
                  <ul className="space-y-4">
                    {[
                      'Academic Excellence',
                      'Critical Thinking and Problem-Solving Skills',
                      'Responsibility and Work Ethic'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-4 border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-20 mt-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="text-center pb-2 max-w-4xl mx-auto">
              <SectionTitle subtitle="OUR SCHOOL" title="Vision" alignment="center" />
              <p className="text-gray-600 font-medium leading-relaxed text-lg pt-2">
                Bequeathing to mother Lak a compassionate citizen nourished by the essence of Dharma and universal knowledge
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="text-center pb-2 max-w-4xl mx-auto mt-16 pt-4">
              <h2 className="text-4xl md:text-5xl font-bold font-handlee text-dark mb-4 leading-tight">Mission</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mx-auto mt-4 mb-6"></div>
              <p className="text-gray-600 font-medium leading-relaxed text-lg pt-2">
                Creating noble human resources suitable for the motherland-loving universe through a set of quantitative, structural and qualitative positive changes in the knowledge, skills and attitudes of children.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="text-center pb-2 max-w-4xl mx-auto mt-20 pt-4">
              <h2 className="text-4xl md:text-5xl font-bold font-handlee text-dark mb-4 leading-tight">Hierarchy</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mx-auto mt-4 mb-10"></div>
              <div className="bg-light p-2 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <Image
                  src="/img/class-5.jpg"
                  alt="School Hierarchy"
                  width={1000}
                  height={600}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facilities */}
      <section className="container-custom py-24">
        <SectionTitle subtitle="What We Offer" title="School Facilities" alignment="center" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {facilities.map((facility, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group bg-white rounded-2xl p-8 shadow-professional hover:shadow-professional-hover transition-all duration-300 border-t-4 border-primary/20 hover:border-primary relative overflow-hidden h-full">
                {facility.icon}
                <div className="relative z-10">
                  {facility.mainIcon}
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{facility.title}</h4>
                  <p className="text-primary font-bold text-sm mb-4 leading-relaxed">{facility.description}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{facility.details}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principals */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="container-custom">
          <SectionTitle subtitle="Our Leaders" title="Meet Our Principals" alignment="center" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16">
            {principals.map((person, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center group">
                  <div className="relative w-full aspect-square mb-6 rounded-full overflow-hidden shadow-sm ring-2 ring-gray-100 group-hover:ring-4 group-hover:ring-primary group-hover:ring-offset-2 transition-all duration-300">
                    <Image 
                      src={person.img}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-dark uppercase tracking-tight">{person.name}</h4>
                  <p className="text-gray-500 italic text-sm">{person.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
