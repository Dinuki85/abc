import Image from 'next/image';
import { 
  CheckCircle2, 
  BookMarked, 
  GraduationCap, 
  Layers, 
  Clock, 
  Globe,
  PlusCircle,
  FileText,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function AcademicsPage() {
  const academicPrograms = [
    { 
      title: 'Grade 6 - 9', 
      img: 'class-1.jpg', 
      desc: 'A diverse range of subjects, including mathematics, science, IT, social studies, and religious education with extracurricular activities.',
      data: [
        { label: 'Medium', value: 'Sinhala/English' },
        { label: 'Parallel Class', value: '04 Classes' },
        { label: 'Daily Periods', value: '08 Periods' },
      ],
      extracurricular: ['Karate', 'Taekwondo', 'Chess', 'Athletics', 'Cricket', 'Elle'],
      subjects: [
        { cat: 'Core Subjects', list: ['Sinhala', 'Mathematics', 'Science', 'English', 'Tamil', 'History', 'Civic Edu.', 'Health & P.S', 'ICT', 'PTS'] },
        { cat: 'Religion', list: ['Buddhism', 'Roman Catholic'] },
        { cat: 'Aesthetic', list: ['Drama', 'Art', 'Dancing', 'Music'] }
      ]
    },
    { 
      title: 'Grade 10 - 11', 
      img: 'class-2.jpg', 
      desc: 'Preparing for General Certificate of Education Ordinary Level (G.C.E. O/L) examinations, which are a significant milestone in their academic journey.',
      data: [
        { label: 'Medium', value: 'Sinhala/English' },
        { label: 'Parallel Class', value: '03 Classes' },
        { label: 'Daily Periods', value: '08 Periods' },
      ],
      extracurricular: ['Karate', 'Taekwondo', 'Chess', 'Athletics', 'Cricket', 'Elle'],
      subjects: [
        { cat: 'Core Subjects', list: ['Sinhala', 'Mathematics', 'Science', 'English', 'History'] },
        { cat: 'Group - I', list: ['Geography', 'Accounting', 'Civic Edu.'] },
        { cat: 'Group - II', list: ['Art', 'Dancing', 'Music', 'Drama & Theatre'] },
        { cat: 'Group - III', list: ['ICT', 'Media & Com.', 'Agriculture', 'Health & P.S', 'Home Sci.'] }
      ]
    },
    { 
      title: 'Advanced Level - Mathematics', 
      img: 'class-3.jpg', 
      desc: 'Strong foundation in mathematics, Physics, Chemistry and IT to pursuing further studies in engineering related fields.',
      data: [
        { label: 'Medium', value: 'Sinhala' },
        { label: 'Alt. Subject', value: 'ICT' },
        { label: 'Daily Periods', value: '08 Periods' },
      ],
      extracurricular: ['Karate', 'Taekwondo', 'Chess', 'Athletics', 'Cricket', 'Elle'],
      subjects: [
        { cat: 'Core Subjects', list: ['Combined Maths', 'Physics', 'Chemistry', 'General English', 'General IT (GIT)'] }
      ]
    },
    { 
      title: 'Advanced Level - Commerce', 
      img: 'class-4.jpg', 
      desc: 'Equips students with knowledge and skills relevant to careers in business, finance, banking, and marketing.',
      data: [
        { label: 'Medium', value: 'Sinhala' },
        { label: 'Optional', value: 'IT' },
        { label: 'Daily Periods', value: '08 Periods' },
      ],
      extracurricular: ['Karate', 'Taekwondo', 'Chess', 'Athletics', 'Cricket', 'Elle'],
      subjects: [
        { cat: 'Core Subjects', list: ['Accounting', 'Economics', 'Business Studies'] }
      ]
    },
    { 
      title: 'Advanced Level - Arts', 
      img: 'class-5.jpg', 
      desc: 'Encourages students to think critically, appreciate cultural diversity, and engage with social and ethical issues.',
      data: [
        { label: 'Medium', value: 'Sinhala' },
        { label: 'Optional', value: 'IT & More' },
        { label: 'Daily Periods', value: '08 Periods' },
      ],
      extracurricular: ['Karate', 'Taekwondo', 'Chess', 'Athletics', 'Cricket', 'Elle'],
      subjects: [
        { cat: 'Available Subjects', list: ['Sinhala', 'Buddhist Civilization', 'Political Science', 'History', 'Geography', 'Economics', 'Home Economics', 'Media & Com. Art', 'Dancing (Indigenous)', 'Music (Oriental)', 'Drama & Theatre (Sinhala)'] }
      ]
    },
    { 
      title: '13 Years Guaranteed Education', 
      img: 'class-6.jpg', 
      desc: 'Under the theme "The professional turning point in Free Education". Provides NVQ qualifications notwithstanding O/L results.',
      data: [
        { label: 'Medium', value: 'Sinhala' },
        { label: 'Academic', value: '1 1/2 Years' },
        { label: 'Vocational', value: '06 Months' },
        { label: 'NVQ', value: 'Available' },
      ],
      subjects: [
        { cat: 'Vocational', list: ['Livestock Production', 'Landscape Design', 'Food Production', 'Plantation Production', 'Manufacturing', 'Aluminum Inspection', 'Metal Supply', 'Motor Mechanic'] }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. Header Section */}
      <section className="relative bg-primary py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_70%)] opacity-20"></div>
        </div>
        <Reveal width="100%">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">Academics</h1>
            <p className="text-white/80 text-2xl font-medium max-w-4xl mx-auto italic leading-relaxed">
              We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 2. Popular Classes Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal width="100%">
            <div className="text-center space-y-4 mb-20">
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-1 bg-primary"></div>
                <span className="text-primary font-black uppercase tracking-widest text-sm italic">Educational Programs</span>
                <div className="w-16 h-1 bg-primary"></div>
              </div>
              <h2 className="text-6xl font-black text-dark tracking-tight uppercase">Classes for our Kids</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {academicPrograms.map((prog, i) => (
              <Reveal key={i} width="100%">
                <div className="flex flex-col bg-white rounded-[2.5rem] shadow-2xl overflow-hidden hover:shadow-primary/20 transition-all duration-500 border border-gray-100 group">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src={`/img/${prog.img}`} 
                      alt={prog.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-secondary transition-colors duration-300">{prog.title}</h3>
                    </div>
                  </div>

                  <div className="p-10 space-y-8 flex-1 flex flex-col">
                    <p className="text-gray-500 font-medium italic border-l-4 border-primary pl-6 py-1 leading-relaxed">{prog.desc}</p>
                    
                    {/* Professional Data Table */}
                    <div className="bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <table className="w-full text-sm">
                        <tbody>
                          {prog.data.map((row, ri) => (
                            <tr key={ri} className="border-b border-slate-100 last:border-0 group/row">
                              <td className="px-6 py-4 font-black text-primary uppercase tracking-widest text-[10px] w-1/2 bg-slate-100/30 border-r border-slate-100 group-hover/row:bg-primary group-hover/row:text-white transition-colors">
                                {row.label}
                              </td>
                              <td className="px-6 py-4 font-bold text-dark text-xs">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Subjects Section */}
                    <div className="space-y-6 pt-2 border-t border-gray-100 flex-1">
                       <h4 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3">
                         <div className="w-8 h-1 bg-secondary"></div>
                         Subjects Offered
                       </h4>
                       <div className="space-y-4">
                          {prog.subjects.map((cat, ci) => (
                             <div key={ci} className="space-y-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{cat.cat}</span>
                                <div className="flex flex-wrap gap-2 text-xs">
                                   {cat.list.map(s => (
                                      <span key={s} className="bg-white px-3 py-1.5 rounded-lg font-bold text-slate-700 border border-slate-200 shadow-sm hover:border-primary hover:text-primary transition-all cursor-default">
                                        {s}
                                      </span>
                                   ))}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Extracurricular */}
                    {prog.extracurricular && (
                      <div className="space-y-4 pt-6 border-t border-gray-100">
                         <h4 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-3">
                           <div className="w-8 h-1 bg-primary"></div>
                           Extracurricular
                         </h4>
                         <div className="flex flex-wrap gap-2">
                            {prog.extracurricular.map(ex => (
                               <span key={ex} className="bg-primary/5 px-3 py-1.5 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest border border-primary/10">
                                 {ex}
                               </span>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Enrollment Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal width="100%">
            <div className="flex flex-col lg:flex-row items-center gap-16 bg-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-3xl group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 transition-transform duration-1000 group-hover:scale-125"></div>
              
              <div className="lg:w-1/2 space-y-12 relative z-10 text-left">
                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-secondary">
                    <div className="w-20 h-1.5 bg-secondary"></div>
                    <span className="font-black uppercase tracking-widest text-lg italic">School Enrollment</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">Application Calling</h2>
                  <p className="text-white/60 text-xl leading-relaxed font-medium italic">
                    WP/NG Andiambalama Maha Vidyalaya is classified as a 1AB school by the Ministry of Education. We invite applications for admission on three primary occasions.
                  </p>
                </div>

                <div className="space-y-6">
                   {[
                     'Grade 06 Enrollment', 
                     'Advance Level Enrollment', 
                     '13 Years Guaranteed Education'
                   ].map(item => (
                     <div key={item} className="flex items-center gap-6 bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-white/10 hover:border-secondary transition-all cursor-default group/item">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover/item:bg-secondary group-hover/item:text-dark transition-all duration-300">
                          <GraduationCap className="text-secondary group-hover/item:text-dark transition-colors" size={32} />
                        </div>
                        <span className="text-white font-black text-2xl tracking-tight uppercase leading-none">{item}</span>
                     </div>
                   ))}
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                   {['Grade 06', 'A/L', '13 Years'].map(btn => (
                      <Button key={btn} className="bg-secondary hover:bg-white text-dark font-black tracking-widest rounded-full border-none px-10 py-8 text-lg uppercase flex items-center gap-3 group/btn shadow-xl hover:shadow-secondary/20 transition-all">
                        {btn} <PlusCircle size={20} className="group-hover/btn:rotate-90 transition-transform" />
                      </Button>
                   ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative space-y-8">
                 <div className="relative rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <Image 
                      src="/img/about-1.jpg" 
                      alt="Application Process" 
                      width={1000} 
                      height={1000} 
                      className="w-full h-auto aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
                 <div className="bg-primary p-12 rounded-[2.5rem] shadow-2xl relative z-20 -mt-20 -ml-12 border border-white/10 hidden xl:block">
                    <p className="text-white font-black italic text-xl leading-relaxed">
                      "Opening doors to professional excellence through modern free education."
                    </p>
                 </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
