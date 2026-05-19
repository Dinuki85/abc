"use client";

import { 
  UserCheck, Trophy, Calendar, GraduationCap, 
  Star, ArrowRight, BookCheck, ClipboardList, Zap, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  // Row 1
  { name: 'Add To Classes', href: '/admin/registration/add-to-class', icon: UserCheck, desc: "Assign students to classes", color: "#17a2b8" },
  { name: 'Add To Sport', href: '#', icon: Trophy, desc: "Register for sports teams", color: "#17a2b8" },
  { name: 'Add To Co-Activities', href: '#', icon: Star, desc: "Enroll in school societies", color: "#17a2b8" },
  { name: 'Time Table', href: '#', icon: Zap, desc: "Assign period schedules", color: "#d97706" },
  // Row 2
  { name: 'Scholarship', href: '#', icon: GraduationCap, desc: "Enrollment applications", color: "#d97706" },
  { name: 'Add To Event', href: '#', icon: Calendar, desc: "Register for school events", color: "#d97706" },
  { name: 'Add To Subject', href: '#', icon: BookCheck, desc: "Assign optional subjects", color: "#343a40" },
  { name: 'Add To Assessment', href: '#', icon: ClipboardList, desc: "Register for evaluations", color: "#343a40" },
];

export default function RegistrationPage() {
  return (
    <div className="h-full flex flex-col gap-2 animate-in fade-in duration-700">
      {/* Back Header */}
      <div className="flex items-center gap-3 px-2 py-0.5">
        <Link 
          href="/admin" 
          className="w-8 h-8 rounded-lg bg-white border-2 border-slate-100 flex items-center justify-center text-black hover:border-primary hover:text-primary transition-all shadow-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" strokeWidth={3} />
        </Link>
        <div>
          <h1 className="text-base font-black text-black uppercase tracking-tight leading-none">Registration Management</h1>
          <p className="text-[9px] font-black text-black/50 uppercase tracking-[0.2em] mt-0.5">Command Center / Registration</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-2 p-0.5">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link key={i} href={mod.href} className="block group h-full">
              <div
                className="h-full bg-white rounded-xl p-2 px-3 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: `${mod.color}25` }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = mod.color;
                  el.style.transform = 'translateY(-1px)';
                  el.style.boxShadow = `0 6px 20px -8px ${mod.color}30`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${mod.color}25`;
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                {/* Watermark icon */}
                <Icon
                  className="absolute -bottom-2 -right-2 opacity-[0.04] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.08]"
                  style={{ width: 50, height: 50, color: mod.color }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    <ArrowRight size={12} strokeWidth={3} />
                  </div>
                </div>

                <div className="mt-1">
                  <h3 className="text-[16px] font-black tracking-tight leading-tight text-black uppercase transition-colors duration-200">
                    {mod.name}
                  </h3>
                  <p className="text-[11px] font-black text-black mt-0.5 leading-snug opacity-80 line-clamp-1">
                    {mod.desc}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"
                  style={{ backgroundColor: mod.color }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
