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
  const modules = [
    { name: 'Student Profile', href: '/admin/students', icon: UserPlus, desc: "Records & Enrollment", color: "#17a2b8" },
    { name: 'Staff Directory', href: '/admin/staff', icon: Briefcase, desc: "Teaching & Academic", color: "#17a2b8" },
    { name: 'Guardian Info', href: '/admin/parents', icon: Heart, desc: "Emergency Contacts", color: "#17a2b8" },
    { name: 'Section Matrix', href: '/admin/grades', icon: Layers, desc: "Primary & Secondary", color: "#ffc107" },
    { name: 'Subject Matrix', href: '/admin/subjects', icon: BookCheck, desc: "Curriculum Mapping", color: "#ffc107" },
    { name: 'Class Matrix', href: '/admin/classes', icon: Presentation, desc: "Room Assignments", color: "#ffc107" },
    { name: 'User Access', href: '/admin/users', icon: ShieldUser, desc: "Roles & Security", color: "#343a40" },
    { name: 'Co-Curricular', href: '#', icon: Star, desc: "Societies & Clubs", color: "#343a40" },
    { name: 'Sport List', href: '#', icon: Trophy, desc: "Athletics & Teams", color: "#343a40" },
  ];

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-700">
      {/* Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0">

        {modules.map((btn, i) => (
          <Link key={i} href={btn.href} className="block h-full group">
            <div className="bg-white border-2 border-slate-50 rounded-[1.5rem] p-4 h-full flex items-center gap-4 hover:border-[#17a2b8]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group/card">
              {/* Subtle background icon for premium feel */}
              <btn.icon className="absolute -right-4 -bottom-4 w-20 h-20 text-slate-50 group-hover/card:text-[#17a2b8]/5 transition-colors" />
              
              <div className={`p-3 rounded-2xl transition-all duration-500`} style={{ backgroundColor: `${btn.color}10`, color: btn.color }}>
                <btn.icon size={22} className="group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="flex-1 min-w-0 z-10">
                <h3 className="text-sm font-black text-[#343a40] tracking-tight group-hover:text-[#17a2b8] transition-colors truncate">
                  {btn.name}
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mt-0.5 truncate">
                  {btn.desc}
                </p>
              </div>
              
              <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#17a2b8] group-hover:text-white transition-all">
                <BookOpen size={12} />
              </div>
            </div>
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

