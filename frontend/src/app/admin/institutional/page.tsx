"use client";

import { 
  Users, UserCheck, Layers, BookOpen, GraduationCap, 
  ClipboardList, Briefcase, HeartHandshake, ShieldCheck,
  Calendar, Award, Trophy, Medal, CheckCircle2, Heart,
  UserPlus, BookCheck, ShieldUser, Presentation
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function InstitutionalAdminPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Institutional Administration
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Core Institutional Profile Management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Student Profile', href: '/admin/students', icon: UserPlus, desc: "Manage detailed student records and profiles." },
          { name: 'Staff Directory', href: '/admin/staff', icon: Briefcase, desc: "Manage teaching and non-teaching staff records." },
          { name: 'Guardian Info', href: '/admin/parents', icon: Heart, desc: "Manage parent and guardian contact information." },
          { name: 'Section Matrix', href: '/admin/grades', icon: Layers, desc: "Configure primary and secondary sections." },
          { name: 'Subject Matrix', href: '/admin/subjects', icon: BookCheck, desc: "Manage academic subjects and curriculums." },
          { name: 'Class Matrix', href: '/admin/classes', icon: Presentation, desc: "Configure individual classrooms and capacities." },
          { name: 'User Access', href: '/admin/users', icon: ShieldUser, desc: "Manage system access and roles." },
          { name: 'Co-Curricular', href: '#', icon: Star, desc: "Manage school societies and clubs." },
          { name: 'Sport List', href: '#', icon: Trophy, desc: "Manage school sports teams and activities." },
        ].map((btn, i) => (
          <Link key={i} href={btn.href}>
            <Card className="hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group rounded-[2rem] border-slate-100 shadow-sm h-full">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/5 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                    <btn.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">{btn.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-medium">{btn.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Star(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
