"use client";

import { 
  FileSpreadsheet, Users, HeartHandshake, Activity, 
  Award, Phone, FileCheck, Layers, BookCheck, 
  GraduationCap, Heart, Landmark, Users2, 
  UserCheck, ShieldCheck, BookOpen, Contact, 
  Briefcase, Calendar, ArrowRight, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ReportingPage() {
  return (
    <div className="h-full flex flex-col gap-3 animate-in fade-in duration-700">
      {/* Back Header */}
      <div className="flex items-center gap-4 px-2 py-1">
        <Link 
          href="/admin" 
          className="w-10 h-10 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-lg font-black text-black uppercase tracking-tight leading-none">Institutional Reporting</h1>
          <p className="text-[10px] font-black text-black/50 uppercase tracking-[0.2em] mt-1">Command Center / Reporting</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 content-start">
        <ReportSection 
          title="All School Data" 
          color="#17a2b8"
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
          color="#d97706"
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
          color="#6f42c1"
          items={[
            { name: 'Class Teacher List', icon: UserCheck },
            { name: 'Teacher Incharge List', icon: ShieldCheck },
            { name: 'Subject Wise List', icon: BookOpen },
          ]} 
        />

        <ReportSection 
          title="Individual CV & Files" 
          color="#343a40"
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

function ReportSection({ title, items, color }: any) {
  return (
    <div className="bg-white p-4 rounded-[1.5rem] border-2 shadow-sm space-y-3 flex flex-col h-full transition-all duration-300 hover:shadow-lg"
         style={{ borderColor: `${color}15` }}>
      <div className="flex flex-col gap-1 px-1">
        <h4 className="text-[13px] font-black text-black uppercase tracking-[0.1em]">{title}</h4>
        <div className="w-10 h-1 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <div className="grid grid-cols-1 gap-1.5 flex-1">
        {items.map((item: any, i: number) => (
          <Link 
            key={i} 
            href="#" 
            className="flex items-center justify-between group p-2.5 rounded-xl border-2 border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${color}10`, color: color }}
              >
                <item.icon size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-black text-black uppercase tracking-tight">{item.name}</span>
            </div>
            <ArrowRight size={12} className="text-slate-300 group-hover:text-black group-hover:translate-x-1 transition-all" strokeWidth={3} />
          </Link>
        ))}
      </div>
    </div>
  );
}
