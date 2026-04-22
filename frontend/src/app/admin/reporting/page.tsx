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
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl border border-white/10">
              <FileSpreadsheet size={28} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight font-handlee">
              Advanced Reporting Engine
            </h1>
          </div>
          <p className="text-slate-400 font-medium ml-15">
            Cross-Reference Institutional Intelligence & PDF Generation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
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
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em] font-handlee">{title}</h4>
        <div className="w-12 h-1 bg-secondary rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-2 flex-1">
        {items.map((item: any, i: number) => (
          <Link key={i} href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 hover:shadow-md hover:border-slate-200 border border-transparent transition-all group">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
             <item.icon size={16} />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
