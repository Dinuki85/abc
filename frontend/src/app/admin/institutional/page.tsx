"use client";

import {
  Layers, BookCheck, Briefcase, Heart, Trophy,
  UserPlus, Presentation, ClipboardList, Award,
  Calendar, Users, Medal, Zap, BookOpen
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
    <div className="h-full grid grid-cols-4 grid-rows-3 gap-3 p-0.5 animate-in fade-in duration-700">
      {modules.map((mod, i) => {
        const Icon = mod.icon;
        return (
          <Link key={i} href={mod.href} className="group block">
            <div
              className="h-full bg-white rounded-2xl p-4 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
              style={{ borderColor: `${mod.color}25` }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = mod.color;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = `0 10px 30px -8px ${mod.color}35`;
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
                className="absolute -bottom-3 -right-3 pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.08]"
                style={{ width: 80, height: 80, color: mod.color }}
              />

              {/* Icon badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
              >
                <Icon size={22} strokeWidth={2.2} />
              </div>

              {/* Text */}
              <div className="z-10 mt-2">
                <h3
                  className="text-lg font-black tracking-tight leading-tight transition-colors duration-200 text-black uppercase"
                >
                  {mod.name}
                </h3>
                <p className="text-[11px] font-black text-black mt-1 leading-snug line-clamp-1 opacity-80">
                  {mod.desc}
                </p>
              </div>


              {/* Bottom color accent bar */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ backgroundColor: mod.color }}
              />
            </div>
          </Link>
        );
      })}
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
