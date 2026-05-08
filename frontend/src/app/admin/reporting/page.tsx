"use client";

import { 
  FileSpreadsheet, Users, HeartHandshake, Activity, 
  Award, Phone, FileCheck, Layers, BookCheck, 
  GraduationCap, Heart, Landmark, Users2, 
  UserCheck, ShieldCheck, BookOpen, Contact, 
  Briefcase, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function ReportingPage() {
  return (
    <div className="h-full flex flex-col gap-3 animate-in fade-in duration-1000 pb-2">
      <div className="relative overflow-hidden bg-slate-900 rounded-xl p-3 md:p-4 shadow-xl border border-white/5 flex-shrink-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
              <FileSpreadsheet className="text-indigo-400" size={14} />
              <span className="text-[12px] font-black text-indigo-300 uppercase tracking-[0.2em]">Institutional Report Matrix</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter font-handlee italic leading-none">
              Institutional <span className="text-indigo-400">Reporting</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto custom-scrollbar content-start">
        
        <ReportSection 
          title="All School Data" 
          items={[
            { name: 'All Student List', icon: Users },
            { name: 'Welfare Paid/Not Paid', icon: HeartHandshake },
            { name: 'Health Report', icon: Activity },
            { name: 'Skill Matrix Report', icon: Award },
            { name: 'Contact Directory', icon: Phone },
            { name: 'School Exam Report', icon: FileCheck },
          ]} 
        />

        <ReportSection 
          title="Student Categorization" 
          items={[
            { name: 'Section Based List', icon: Layers },
            { name: 'Subject Based List', icon: BookCheck },
            { name: 'Scholarship Roll', icon: GraduationCap },
            { name: 'Religion Based List', icon: Heart },
            { name: 'Nationality Based List', icon: Landmark },
            { name: 'Gender Based List', icon: Users2 },
          ]} 
        />

        <ReportSection 
          title="Teacher Records" 
          items={[
            { name: 'Class Teacher List', icon: UserCheck },
            { name: 'Teacher Incharge List', icon: ShieldCheck },
            { name: 'Subject Wise List', icon: BookOpen },
          ]} 
        />

        <ReportSection 
          title="Individual CV & Files" 
          items={[
            { name: 'Student Curriculum Vitae', icon: Contact },
            { name: 'Teacher Curriculum Vitae', icon: Briefcase },
            { name: 'Guardian Curriculum Vitae', icon: Heart },
            { name: 'Teacher Timetable', icon: Calendar },
          ]} 
        />

      </div>
    </div>
  );
}

function ReportSection({ title, items }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 flex flex-col h-full">
      <div className="flex flex-col gap-1">
        <h4 className="text-[12px] font-black text-black uppercase tracking-[0.2em] font-handlee">{title}</h4>
        <div className="w-10 h-0.5 bg-indigo-500 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-1.5 flex-1">
        {items.map((item: any, i: number) => (
          <Link key={i} href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-600 hover:shadow-md border border-transparent transition-all group">
            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-700 group-hover:bg-white/20 group-hover:text-white transition-all">
             <item.icon size={14} />
            </div>
            <span className="text-[12px] font-black text-black group-hover:text-white transition-colors">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
