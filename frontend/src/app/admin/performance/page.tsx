"use client";

import { 
  CheckCircle2, GraduationCap, Trophy, HeartHandshake, 
  FileSpreadsheet, ClipboardList, Activity
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function PerformancePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Activity size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Performance Analytics
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Academic Records & Merit Reporting
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Exam Results Entry', href: '#', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Input and analyze student examination scores." },
          { name: 'Scholarship Dist.', href: '#', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Track scholarship distributions and merit awards." },
          { name: 'Sporting Success', href: '#', icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Log team placements and athletic achievements." },
          { name: 'Welfare Processing', href: '#', icon: HeartHandshake, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Manage student welfare funds and programs." },
          { name: 'S1 Data Forms', href: '#', icon: FileSpreadsheet, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Submit and review official governmental S1 forms." },
          { name: 'Assessment Analytics', href: '#', icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'hover:border-emerald-600 hover:shadow-emerald-600/20', group: 'group-hover:bg-emerald-600', desc: "Review classroom level assessment metrics." },
        ].map((btn, i) => (
          <Link key={i} href={btn.href}>
            <Card className={`transition-all cursor-pointer group rounded-[2rem] border-slate-100 shadow-sm h-full ${btn.hover}`}>
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all group-hover:text-white ${btn.color} ${btn.bg} ${btn.group}`}>
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
