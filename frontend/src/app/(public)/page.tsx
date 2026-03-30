import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4 md:px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50" />
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 border border-blue-200">
            Next Generation Education Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Empower Learning with <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Modern Technology
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
            A complete ecosystem for schools to manage student data, staff records, 
            attendance, examinations, and communication effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/admission">
              <Button size="lg" className="rounded-full w-full sm:w-auto text-lg px-8">
                Apply for Admission
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="rounded-full w-full sm:w-auto text-lg px-8 group">
                Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Choose EduConnect?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive system provides everything you need to run your educational institution efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Interactive Learning', desc: 'Modern tools for students to engage with course materials.', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
              { title: 'Parent Portal', desc: 'Real-time updates on student progress and attendance.', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { title: 'Extra-curriculars', desc: 'Manage sports and clubs seamlessly alongside academics.', icon: Award, color: 'text-rose-500', bg: 'bg-rose-50' },
              { title: 'Secure Data', desc: 'Enterprise-grade security protecting sensitive student records.', icon: ShieldCheck, color: 'text-teal-500', bg: 'bg-teal-50' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Ready to transform your school?
          </h2>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Join hundreds of educational institutions already using our platform to modernize their operations.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full text-lg px-8 bg-white text-blue-600 hover:bg-slate-50 border-none shadow-xl hover:shadow-2xl">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
