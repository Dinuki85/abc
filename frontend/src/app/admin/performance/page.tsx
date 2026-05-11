"use client";

import { 
  CheckCircle2, GraduationCap, Trophy, HeartHandshake, 
  FileSpreadsheet, ClipboardList, ArrowRight, BarChart3,
  TrendingUp, Wallet, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  // Row 1
  { name: 'Exam Result', href: '#', icon: CheckCircle2, desc: "Input & verify student scores", color: "#17a2b8" },
  { name: 'Scholarship Distribution', href: '#', icon: GraduationCap, desc: "Manage merit-based awards", color: "#17a2b8" },
  { name: 'Sport Places', href: '#', icon: Trophy, desc: "Track athletic achievements", color: "#17a2b8" },
  { name: 'Welfare Payment', href: '#', icon: HeartHandshake, desc: "Student support programs", color: "#d97706" },
  // Row 2
  { name: 'Welfare Tracking', href: '#', icon: Wallet, desc: "Audit payment history", color: "#d97706" },
  { name: 'S1 Form', href: '#', icon: FileSpreadsheet, desc: "Official gov. data forms", color: "#d97706" },
  { name: 'Performance Analytics', href: '#', icon: TrendingUp, desc: "Advanced result metrics", color: "#343a40" },
  { name: 'Assessment Result', href: '#', icon: ClipboardList, desc: "Review classroom evaluations", color: "#343a40" },
];

export default function PerformancePage() {
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
          <h1 className="text-lg font-black text-black uppercase tracking-tight leading-none">Performance Monitoring</h1>
          <p className="text-[10px] font-black text-black/50 uppercase tracking-[0.2em] mt-1">Command Center / Performance</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3 p-0.5">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <Link key={i} href={mod.href} className="block group">
              <div
                className="h-full bg-white rounded-[2rem] p-6 flex flex-col justify-between border-2 transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: `${mod.color}25` }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = mod.color;
                  el.style.transform = 'translateY(-3px)';
                  el.style.boxShadow = `0 12px 40px -10px ${mod.color}30`;
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
                  className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.08]"
                  style={{ width: 100, height: 100, color: mod.color }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    <Icon size={28} strokeWidth={2.2} />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${mod.color}15`, color: mod.color }}
                  >
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-black tracking-tight leading-tight text-black uppercase transition-colors duration-200">
                    {mod.name}
                  </h3>
                  <p className="text-[11px] font-black text-black mt-1 leading-snug opacity-80 line-clamp-1">
                    {mod.desc}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[4px] w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
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
