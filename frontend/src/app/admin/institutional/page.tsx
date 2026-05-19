"use client";

import {
  Layers, BookCheck, Briefcase, Heart, Trophy,
  UserPlus, Presentation, ClipboardList, Award,
  Calendar, Users, Medal, Zap, BookOpen, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  // Row 1
  { name: 'Student',        href: '/admin/students',    icon: UserPlus,       desc: 'Records & Enrollment',     color: '#17a2b8' },
  { name: 'Staff',          href: '/admin/staff',       icon: Briefcase,      desc: 'Teaching & Academic',       color: '#17a2b8' },
  { name: 'Guardian',       href: '/admin/parents',     icon: Heart,          desc: 'Parent & Contacts',         color: '#17a2b8' },
  { name: 'Section',        href: '/admin/grades',      icon: Layers,         desc: 'Primary & Secondary',       color: '#d97706' },
  // Row 2
  { name: 'Subject',        href: '/admin/subjects',    icon: BookCheck,      desc: 'Curriculum Mapping',        color: '#d97706' },
  { name: 'Class',          href: '/admin/classes',     icon: Presentation,   desc: 'Room Assignments',          color: '#d97706' },
  { name: 'Assessment',     href: '#',                  icon: ClipboardList,  desc: 'Exams & Evaluations',       color: '#6f42c1' },
  { name: 'Co-Curricular',  href: '#',                  icon: Star,           desc: 'Societies & Clubs',         color: '#6f42c1' },
  // Row 3
  { name: 'Sport',          href: '#',                  icon: Trophy,         desc: 'Athletics & Teams',         color: '#6f42c1' },
  { name: 'Scholarship',    href: '#',                  icon: Award,          desc: 'Bursaries & Awards',        color: '#343a40' },
  { name: 'Sportmeet',      href: '#',                  icon: Medal,          desc: 'Meets & Championships',     color: '#343a40' },
  { name: 'Event',          href: '#',                  icon: Calendar,       desc: 'School Events & Calendar',  color: '#343a40' },
];

export default function InstitutionalAdminPage() {
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
          <h1 className="text-base font-black text-black uppercase tracking-tight leading-none">Institutional Administration</h1>
          <p className="text-[9px] font-black text-black/50 uppercase tracking-[0.2em] mt-0.5">Command Center / Institutional</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-2 p-0.5">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link key={i} href={mod.href} className="group block h-full">
              <div
                className="h-full bg-white rounded-xl p-2 px-3 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
                style={{ borderColor: `${mod.color}25` }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = mod.color;
                  el.style.transform = 'translateY(-1px)';
                  el.style.boxShadow = `0 6px 20px -8px ${mod.color}35`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${mod.color}25`;
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                {/* Ghost watermark icon */}
                <Icon
                  className="absolute -bottom-2 -right-2 pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.08]"
                  style={{ width: 50, height: 50, color: mod.color }}
                />

                {/* Icon badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>

                {/* Text */}
                <div className="z-10 mt-1">
                  <h3
                    className="text-[13px] font-black tracking-tight leading-tight transition-colors duration-200 text-black uppercase"
                  >
                    {mod.name}
                  </h3>
                  <p className="text-[10px] font-black text-black mt-0.5 leading-snug line-clamp-1 opacity-80">
                    {mod.desc}
                  </p>
                </div>

                {/* Bottom color accent bar */}
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

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
