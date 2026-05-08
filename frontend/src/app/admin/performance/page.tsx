"use client";

import { 
  CheckCircle2, GraduationCap, Trophy, HeartHandshake, 
  FileSpreadsheet, ClipboardList, Activity
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function PerformancePage() {
  return (
    <div className="h-full flex flex-col gap-3 animate-in fade-in duration-1000 pb-2">
      <div className="relative overflow-hidden bg-slate-900 rounded-xl p-3 md:p-4 shadow-xl border border-white/5 flex-shrink-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
              <Activity className="text-emerald-400" size={14} />
              <span className="text-[12px] font-black text-emerald-300 uppercase tracking-[0.2em]">Institutional Merit Matrix</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter font-handlee italic leading-none">
              Performance & <span className="text-emerald-400">Analytics</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto custom-scrollbar content-start">
        {[
          { name: 'Exam Results Entry', href: '#', icon: CheckCircle2, desc: "Input and analyze student examination scores." },
          { name: 'Scholarship Dist.', href: '#', icon: GraduationCap, desc: "Track scholarship distributions and merit awards." },
          { name: 'Sporting Success', href: '#', icon: Trophy, desc: "Log team placements and athletic achievements." },
          { name: 'Welfare Processing', href: '#', icon: HeartHandshake, desc: "Manage student welfare funds and programs." },
          { name: 'S1 Data Forms', href: '#', icon: FileSpreadsheet, desc: "Submit and review official governmental S1 forms." },
          { name: 'Assessment Analytics', href: '#', icon: ClipboardList, desc: "Review classroom level assessment metrics." },
        ].map((btn, i) => (
          <Link key={i} href={btn.href} className="group h-full">
            <div className="h-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:bg-emerald-600 hover:border-emerald-600 group-active:scale-95 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-white/20 group-hover:text-white transition-all">
                  <btn.icon size={18} />
                </div>
                <h3 className="text-[12px] font-black text-black group-hover:text-white uppercase tracking-widest">{btn.name}</h3>
              </div>
              <p className="text-[11px] font-bold text-slate-800 group-hover:text-white/80 leading-tight">{btn.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
