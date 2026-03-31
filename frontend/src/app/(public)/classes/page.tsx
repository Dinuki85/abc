"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function AcademicsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Academics' },
  ];

  const academicPrograms = [
    { 
      title: 'Grade 6 - 9', 
      img: 'class-1.jpg', 
      desc: 'a diverse range of subjects, including mathematics, science, IT, social studies, and religious education with extracurricular activities.',
      medium: 'Sinhala/English',
      parallel: '04 Classes',
      periods: '08 Periods',
      extracurricular: [
        '1. Karate', '2. Taekwondo', '3. Chess', '4. Athletics', '5. Cricket', '6. Elle'
      ],
      subjects: [
        '1. Sinhala',
        '2. Religion (Buddhism / Roman Catholic)',
        '3. Mathematics',
        '4. Science',
        '5. English',
        '6. Tamil',
        '7. History',
        '8. Civic Edu.',
        '9. Health & P.S',
        '10. ICT',
        '11. PTS',
        '12. Aesthetic (Drama / Art / Dancing / Music)'
      ]
    },
    { 
      title: 'Grade 10 - 11', 
      img: 'class-2.jpg', 
      desc: 'Preparing for General Certificate of Education Ordinary Level (G.C.E. O/L) examinations, which are a significant milestone in their academic journey.',
      medium: 'Sinhala/English',
      parallel: '03 Classes',
      periods: '08 Periods',
      extracurricular: [
        '1. Karate', '2. Taekwondo', '3. Chess', '4. Athletics', '5. Cricket', '6. Elle'
      ],
      coreSubjects: [
        '1. Sinhala',
        '2. Religion (Buddhism / Roman Catholic)',
        '3. Mathematics',
        '4. Science',
        '5. English',
        '6. History'
      ],
      groupI: ['* Geography', '* Accountig', '* Civic Edu.'],
      groupII: ['* Art', '* Dancing', '* Music', '* Drama & Thea.'],
      groupIII: ['* ICT', '* Media & com.', '* Agryculture', '* Health & P.S', '* Home Sci.']
    },
    { 
      title: 'Advanced Level - Mathematics', 
      img: 'class-3.jpg', 
      desc: 'syllabus aims to provide a strong foundation in mathematics, Physics, Chemistry and IT to pursuing further studies in engineering related fields.',
      medium: 'Sinhala',
      altSubject: 'ICT',
      periods: '08 Periods',
      extracurricular: [
        '1. Karate', '2. Taekwondo', '3. Chess', '4. Athletics', '5. Cricket', '6. Elle'
      ],
      subjects: [
        '1. Combined Maths',
        '2. Physics',
        '3. Chemestry',
        '*(Alternative Subject-ICT)',
        '4. General Eng.',
        '5. General IT (GIT)'
      ]
    },
    { 
      title: 'Advanced Level - Commerce', 
      img: 'class-4.jpg', 
      desc: 'Students learn about various aspects of commerce, such as trade, entrepreneurship, marketing, and business operations as wel as equips students with knowledge and skills relevant to careers in business, finance, banking, and related fields',
      medium: 'Sinhala',
      optional: 'IT',
      periods: '08 Periods',
      extracurricular: [
        '1. Karate', '2. Taekwondo', '3. Chess', '4. Athletics', '5. Cricket', '6. Elle'
      ],
      subjects: ['1. Accounting', '2. Economics', '3. Business Studies']
    },
    { 
      title: 'Advanced Level - Arts', 
      img: 'class-5.jpg', 
      desc: 'This stream encourages students to think critically, appreciate cultural diversity, and engage with society\'s social, political, and ethical issues. It also provides a foundation for careers in fields such as education, journalism, law, social work, and the arts.',
      medium: 'Sinhala',
      optional: 'IT & More',
      periods: '08 Periods',
      extracurricular: [
        '1. Karate', '2. Taekwondo', '3. Chess', '4. Athletics', '5. Cricket', '6. Elle'
      ],
      subjects: [
        '1. Sinhala', '2. Buddhist Civilization', '3. Political Science', '4. History', 
        '5. Geography', '6. Economics', '7. Home economics', '8. Media & Communication Art', 
        '9. Dancing (Indigenous)', '10. Music (Oriental)', '11. Drama & Theatre (Sinhala)'
      ]
    },
    { 
      title: '13 Years Guaranteed Education', 
      img: 'class-6.jpg', 
      desc: 'This programme is to be implemented under the theme “The professional turning point in Free Education”. This scheme would enable students who sit for the G.C.E. Ordinary Level Examination to obtain Higher Educational qualifications notwithstanding whether they pass or fail.',
      medium: 'Sinhala',
      academic: '1 1/2 Years',
      vocational: '06 Months',
      nvq: 'Available',
      subjects: [
        '1. Livestock Production Technology', '2. Landscape Design', '3. Food Production Technology', 
        '4. Plantation Production Technology', '5. Manufact- uring', '6. Aluminum Inspection Technology', 
        '7. Metal Supply Technology', '8. Motor Mechanic Technology'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans overflow-x-hidden">
      
      <PageHeader 
        title="Academics" 
        description="We are thrilled to have you join us on our digital journey as we embark on our academic years filled with learning growth and exciting opportunities."
        breadcrumbs={breadcrumbs}
      />

      {/* Popular Classes Section */}
      <section className="container-custom py-16">
        <Reveal>
          <SectionTitle subtitle="Popular Classes" title="Classes for our Kids" alignment="center" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {academicPrograms.map((prog, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col bg-white rounded-2xl shadow-professional hover:shadow-professional-hover overflow-hidden border border-gray-100 h-full transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <Image 
                    src={`/img/${prog.img}`} 
                    alt={prog.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8 text-center border-b border-gray-100">
                  <h4 className="text-2xl font-bold font-handlee text-dark mb-4 group-hover:text-primary transition-colors">{prog.title}</h4>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">{prog.desc}</p>
                </div>

                <div className="bg-white p-0 flex-1">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="p-4 font-bold text-gray-700 bg-gray-50 w-[45%] uppercase tracking-wider text-[10px]">Medium</td>
                        <td className="p-4 font-medium text-gray-600">{prog.medium}</td>
                      </tr>
                      {prog.parallel && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Parallel Class</td>
                          <td className="p-4 font-medium text-gray-600">{prog.parallel}</td>
                        </tr>
                      )}
                      {prog.altSubject && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Alt. Subject</td>
                          <td className="p-4 font-medium text-gray-600">{prog.altSubject}</td>
                        </tr>
                      )}
                      {prog.academic && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Academic</td>
                          <td className="p-4 font-medium text-gray-600">{prog.academic}</td>
                        </tr>
                      )}
                      {prog.vocational && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Vocational</td>
                          <td className="p-4 font-medium text-gray-600">{prog.vocational}</td>
                        </tr>
                      )}
                      {prog.periods && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">Daily Periods</td>
                          <td className="p-4 font-medium text-gray-600">{prog.periods}</td>
                        </tr>
                      )}
                      {prog.nvq && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px]">NVQ</td>
                          <td className="p-4 font-medium text-primary font-bold">{prog.nvq}</td>
                        </tr>
                      )}
                      
                      {prog.extracurricular && (
                        <tr className="border-b border-gray-100">
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Extracurricular</td>
                          <td className="p-4 font-medium text-gray-600">
                            Available
                            <div className="mt-2 space-y-1 pl-2 border-l-2 border-primary/20">
                              {prog.extracurricular.map(item => <div key={item}>{item}</div>)}
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Subjects Logic */}
                      {prog.subjects && (
                        <tr>
                          <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Subjects</td>
                          <td className="p-4 font-medium text-gray-600">
                            <div className="space-y-1">
                              {prog.subjects.map(s => <div key={s}>{s}</div>)}
                            </div>
                          </td>
                        </tr>
                      )}
                      {prog.coreSubjects && (
                        <>
                          <tr className="border-b border-gray-100">
                            <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Core Subjects</td>
                            <td className="p-4 font-medium text-gray-600">
                              <div className="space-y-1">
                                {prog.coreSubjects.map(s => <div key={s}>{s}</div>)}
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Group I</td>
                            <td className="p-4 font-medium text-gray-600">
                              <div className="space-y-1 text-primary">
                                {prog.groupI.map(s => <div key={s}>{s}</div>)}
                              </div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Group II</td>
                            <td className="p-4 font-medium text-gray-600">
                              <div className="space-y-1 text-primary">
                                {prog.groupII.map(s => <div key={s}>{s}</div>)}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 font-bold text-gray-700 bg-gray-50 uppercase tracking-wider text-[10px] align-top">Group III</td>
                            <td className="p-4 font-medium text-gray-600">
                              <div className="space-y-1 text-primary">
                                {prog.groupIII.map(s => <div key={s}>{s}</div>)}
                              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Enrollment Section */}
      <section className="bg-primary/5 py-24 border-t border-gray-100">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <Reveal>
                <div className="space-y-6">
                  <SectionTitle subtitle="School Enrollment" title="Application Calling" alignment="left" />
                  
                  <p className="text-gray-600 font-medium leading-relaxed max-w-xl text-lg">
                    WP/NG Andiambalam Maha Vidyalaya is classified as a 1AB school by the Ministry of Education. Accordingly, applications are invited for the admission of children to Andiambalam Maha Vidyalaya on 3 occasions. You can also apply in the following cases:
                  </p>
                  
                  <ul className="space-y-4 pt-4">
                    {[
                      'Grade 06 Enrollment', 
                      'Advance Level Enrollment', 
                      '13 Years Guaranteed Education Enrollment'
                    ].map(item => (
                      <li key={item} className="flex items-center gap-4 text-dark font-bold">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-primary w-5 h-5" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8">
                    <Button className="w-full sm:w-auto">Applications Grade 06</Button>
                    <Button variant="secondary" className="w-full sm:w-auto">Applications A/L</Button>
                    <Button variant="outline" className="w-full sm:w-auto">13 Years Guaranteed Education</Button>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:w-1/2 w-full">
              <Reveal delay={0.3}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white aspect-square md:aspect-video lg:aspect-square">
                  <Image 
                    src="/img/about-1.jpg" 
                    alt="Application Process" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-10">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white w-full">
                      <h4 className="font-handlee text-2xl font-bold mb-2">Join Our Community</h4>
                      <p className="font-medium text-white/90">Experience excellence in education with our comprehensive curriculum.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
