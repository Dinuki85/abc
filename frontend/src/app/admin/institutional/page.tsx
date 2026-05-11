"use client";

import { 
  Layers, BookOpen, BookCheck, Briefcase,
  Heart, Trophy, UserPlus, Presentation,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  {
    name: 'Student Profile',
    href: '/admin/students',
    icon: UserPlus,
    desc: 'Manage student records & enrollment',
    color: '#17a2b8',
    bg: '#17a2b810',
    border: '#17a2b830',
    shadow: 'rgba(23,162,184,0.15)',
  },
  {
    name: 'Staff Directory',
    href: '/admin/staff',
    icon: Briefcase,
    desc: 'Teaching & non-academic personnel',
    color: '#17a2b8',
    bg: '#17a2b810',
    border: '#17a2b830',
    shadow: 'rgba(23,162,184,0.15)',
  },
  {
    name: 'Guardian Info',
    href: '/admin/parents',
    icon: Heart,
    desc: 'Parent & emergency contacts',
    color: '#17a2b8',
    bg: '#17a2b810',
    border: '#17a2b830',
    shadow: 'rgba(23,162,184,0.15)',
  },
  {
    name: 'Section Matrix',
    href: '/admin/grades',
    icon: Layers,
    desc: 'Primary & secondary sections',
    color: '#d97706',
    bg: '#ffc10710',
    border: '#ffc10730',
    shadow: 'rgba(255,193,7,0.15)',
  },
  {
    name: 'Subject Matrix',
    href: '/admin/subjects',
    icon: BookCheck,
    desc: 'Academic curriculum mapping',
    color: '#d97706',
    bg: '#ffc10710',
    border: '#ffc10730',
    shadow: 'rgba(255,193,7,0.15)',
  },
  {
    name: 'Class Matrix',
    href: '/admin/classes',
    icon: Presentation,
    desc: 'Classrooms & capacities',
    color: '#d97706',
    bg: '#ffc10710',
    border: '#ffc10730',
    shadow: 'rgba(255,193,7,0.15)',
  },
  {
    name: 'Co-Curricular',
    href: '#',
    icon: Star,
    desc: 'Societies, clubs & activities',
    color: '#343a40',
    bg: '#343a4010',
    border: '#343a4025',
    shadow: 'rgba(52,58,64,0.12)',
  },
  {
    name: 'Sport List',
    href: '#',
    icon: Trophy,
    desc: 'Athletics & sports teams',
    color: '#343a40',
    bg: '#343a4010',
    border: '#343a4025',
    shadow: 'rgba(52,58,64,0.12)',
  },
];

export default function InstitutionalAdminPage() {
  return (
    <div className="h-full grid grid-cols-4 grid-rows-2 gap-4 animate-in fade-in duration-700">
      {modules.map((mod, i) => {
        const Icon = mod.icon;
        return (
          <Link key={i} href={mod.href} className="block group">
            <div
              className="h-full bg-white rounded-[2rem] p-5 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden"
              style={{ borderColor: mod.border }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px -10px ${mod.shadow}`;
                (e.currentTarget as HTMLElement).style.borderColor = mod.color;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.borderColor = mod.border;
                (e.currentTarget as HTMLElement).style.transform = '';
              }}
            >
              {/* Watermark icon */}
              <Icon
                className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.07]"
                style={{ width: 90, height: 90, color: mod.color }}
              />

              {/* Top row: icon + arrow */}
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: mod.bg, color: mod.color }}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: mod.bg, color: mod.color }}
                >
                  <ArrowRight size={14} strokeWidth={3} />
                </div>
              </div>

              {/* Bottom: title + desc */}
              <div>
                <h3
                  className="text-[15px] font-black tracking-tight leading-tight transition-colors duration-300"
                  style={{ color: '#343a40' }}
                >
                  {mod.name}
                </h3>
                <p className="text-[11px] font-bold text-slate-400 mt-1 leading-snug">
                  {mod.desc}
                </p>
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
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
      width="24"
      height="24"
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
