import Image from 'next/image';
import { 
  ShieldCheck, 
  Theater, 
  Users, 
  Lightbulb, 
  HeartPulse, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SocietiesPage() {
  const societies = [
    {
      name: "Cadet Platoon",
      img: "blog-1.jpg",
      icon: <ShieldCheck className="text-primary" size={32} />,
      desc: "The Sri Lanka Cadet Corps (SLCC) is a youth organization in Sri Lanka that aims to develop leadership, discipline, and patriotism among students. The Cadet Platoon within a school is a unit of the SLCC where students undergo military training and participate in various activities to instill values of duty, honor, and service."
    },
    {
      name: "St. John Ambulance",
      img: "blog-2.jpg",
      icon: <HeartPulse className="text-secondary" size={32} />,
      desc: "Providing essential first aid training and emergency response skills to students. Our unit is dedicated to serving the school community during events and fostering a culture of care and immediate assistance."
    },
    {
      name: "Drama Club",
      img: "blog-3.jpg",
      icon: <Theater className="text-primary" size={32} />,
      desc: "A creative hub where students explore their passion for performing arts. From stage plays to street drama, the club nurtures talent in acting, directing, and scriptwriting, enhancing self-confidence and expression."
    },
    {
      name: "Prefect Guild",
      img: "blog-1.jpg",
      icon: <Award className="text-secondary" size={32} />,
      desc: "The student leadership body responsible for maintaining discipline and representing the student voice. Prefects at AMV are role models who lead by example and contribute to the smooth operation of daily school life."
    },
    {
      name: "Past Pupil Association",
      img: "blog-2.jpg",
      icon: <Users className="text-primary" size={32} />,
      desc: "A strong network of alumni who continue to support the school's development. Our past pupils play a vital role in mentoring current students and funding infrastructure projects through various initiatives."
    },
    {
      name: "Innovation Club",
      img: "blog-3.jpg",
      icon: <Lightbulb className="text-secondary" size={32} />,
      desc: "Fostering a spirit of inquiry and creation. Students explore STEM projects, robotics, and creative problem-solving, preparing themselves for a rapidly evolving technological landscape."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--color-secondary)_0%,_transparent_60%)] opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">Clubs <span className="font-handlee text-secondary">&</span> Societies</h1>
          <p className="text-white/80 text-xl font-medium max-w-3xl mx-auto italic leading-relaxed">
            Beyond the classroom, we foster leadership, creativity <span className="font-handlee text-secondary">&</span> community service through a vibrant range of extracurricular groups.
          </p>
        </div>
      </section>

      {/* 2. Societies Grid */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="text-primary font-black uppercase tracking-widest text-sm italic">Our Communities</span>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <h2 className="text-5xl font-black text-dark tracking-tight uppercase">Empowering Every Student</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {societies.map((soc, i) => (
              <div key={i} className="flex flex-col bg-white rounded-[2.5rem] p-4 shadow-xl hover:shadow-2xl transition-all duration-300 ring-1 ring-gray-100 group">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-8">
                  <Image 
                    src={`/img/${soc.img}`} 
                    alt={soc.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors"></div>
                </div>

                <div className="px-6 pb-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 bg-light rounded-2xl group-hover:bg-primary/10 transition-colors">
                        {soc.icon}
                     </div>
                     <h3 className="text-2xl font-black text-dark uppercase tracking-tight leading-none">{soc.name}</h3>
                  </div>

                  <p className="text-gray-500 font-medium leading-relaxed flex-1">
                    {soc.desc}
                  </p>

                  <div className="pt-6">
                    <Button variant="secondary" className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-xs border-2 border-transparent hover:border-primary hover:bg-white hover:text-primary transition-all flex items-center gap-2">
                       Learn More <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Call to Action */}
      <section className="py-24 bg-dark">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
           <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Join a Society Today</h2>
           <p className="text-white/60 text-xl font-medium leading-loose">
             Our clubs and societies are open to all students who wish to develop new skills, make friends, and contribute to the school's legacy. Registration is open at the beginning of each academic term.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-secondary text-dark font-black tracking-widest px-12 py-6 rounded-full hover:scale-105 transition-transform">
                 VIEW SCHEDULE
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-2 border-white/20 px-12 py-6 rounded-full hover:bg-white/10 transition-all">
                 CONTACT TEACHER
              </Button>
           </div>
        </div>
      </section>

    </div>
  );
}
