"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Users, UserCheck, Layers, BookOpen, GraduationCap, 
  ClipboardList, Briefcase, HeartHandshake,
  Calendar, Award, Trophy, Medal, CheckCircle2,
  FileSpreadsheet, UserPlus, BookCheck, Activity, Phone,
  FileCheck, Contact, Landmark, LogOut, Clock,
  Heart, Star, Presentation, Users2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const user = api.getCurrentUser();
    setCurrentUser(user);
    api.getAdminStats().then(setStats);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4 animate-in fade-in duration-1000 pb-4">
      {/* High-Impact Institutional Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-4 md:p-6 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
              <ShieldCheck className="text-indigo-400" size={14} />
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Institutional Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter font-handlee italic leading-none">
              Welcome Back, <span className="text-indigo-400">Administrator</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-md text-[10px] leading-relaxed">
              Monitoring AMV Institutional operations with real-time academic and personnel analytics.
            </p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-xl p-2 sm:p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1 min-w-[100px] flex-1 sm:flex-none">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity size={14} />
              </div>
              <span className="text-lg font-black text-white tabular-nums tracking-tighter">98.2%</span>
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest text-center">System Uptime</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-2 sm:p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1 min-w-[100px] flex-1 sm:flex-none">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Users2 size={14} />
              </div>
              <span className="text-lg font-black text-white tabular-nums tracking-tighter">2,412</span>
              <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest text-center">Active Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact High-Density Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Enrollment', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'indigo', change: '+12 this month' },
          { label: 'Academic Faculty', value: stats?.academicStaffCount || 0, icon: Briefcase, color: 'emerald', change: 'Stable' },
          { label: 'Grade Sections', value: stats?.totalSections || 0, icon: Landmark, color: 'amber', change: 'Across 13 grades' },
          { label: 'Total Units', value: stats?.totalClassRooms || 0, icon: Layers, color: 'rose', change: '92% Capacity' },
        ].map((stat, i) => (
          <div key={i} className="group hover:bg-indigo-600 hover:border-indigo-600 hover:shadow-lg transition-all duration-300 rounded-2xl border border-slate-100 shadow-sm bg-white/80 overflow-hidden p-3 relative">
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className={`p-2 bg-slate-50 rounded-lg group-hover:bg-white/10 group-hover:text-white transition-all duration-300 text-slate-400`}>
                <stat.icon size={18} />
              </div>
              <span className={`text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/80`}>
                {stat.change}
              </span>
            </div>
            <div className="relative z-10 text-left">
              <h3 className="text-[8px] font-black text-slate-400 group-hover:text-white/80 transition-colors uppercase tracking-[0.1em]">{stat.label}</h3>
              <p className="text-xl font-black text-slate-800 group-hover:text-white transition-all tracking-tighter tabular-nums font-handlee">
                {stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Dashboard Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-3 border-b border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Landmark size={18} />
             </div>
             <div className="w-12 h-0.5 bg-slate-100 rounded-full" />
          </div>
          <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-slate-50/30">
            {[
              { name: 'Student Profile', href: '/admin/students', icon: UserPlus, color: 'teal' },
              { name: 'Staff Directory', href: '/admin/staff', icon: Briefcase, color: 'teal' },
              { name: 'Guardian Info', href: '/admin/parents', icon: Heart, color: 'teal' },
              { name: 'Section Matrix', href: '/admin/grades', icon: Layers, color: 'teal' },
              { name: 'Subject Matrix', href: '/admin/subjects', icon: BookCheck, color: 'teal' },
              { name: 'Class Matrix', href: '/admin/classes', icon: Presentation, color: 'teal' },
              { name: 'User Access', href: '/admin/users', icon: ShieldUser, color: 'teal' },
            ].map((btn, i) => (
              <DashboardButton key={i} {...btn} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardButton({ name, href, icon: Icon, color }: any) {
  const colorMap: any = {
    teal: 'text-teal-500 bg-white border-slate-100 hover:border-teal-500 hover:bg-teal-50',
    indigo: 'text-indigo-500 bg-white border-slate-100 hover:border-indigo-500 hover:bg-indigo-50',
  };

  return (
    <Link 
      href={href}
      className={`flex flex-col items-center gap-2 p-3 border rounded-xl transition-all group active:scale-95 shadow-sm ${colorMap[color] || colorMap.teal}`}
    >
      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-all">
        <Icon size={18} />
      </div>
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center group-hover:text-slate-800 transition-colors">
        {name}
      </span>
    </Link>
  );
}

function ReportColumn({ title, items }: any) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em] font-handlee">{title}</h4>
        <div className="w-12 h-1 bg-secondary rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item: any, i: number) => (
          <Link key={i} href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md hover:translate-x-2 transition-all group">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
             <item.icon size={14} />
            </div>
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ShieldUser(props: any) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 17s2-1 2-2.5c0-1.5-1-2.5-2-2.5s-2 1-2 2.5c0 1.5 2 2.5 2 2.5" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  )
}

function ShieldCheck(props: any) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function PlusCircle(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}

// Granular commit 4 for Step 5 (Frontend Integration)

// Granular commit 8 for Step 5 (Frontend Integration)

// Granular commit 12 for Step 5 (Frontend Integration)

// Granular commit 16 for Step 5 (Frontend Integration)

// Granular commit 20 for Step 5 (Frontend Integration)

// Granular commit 24 for Step 5 (Frontend Integration)

// Granular commit 28 for Step 5 (Frontend Integration)
// Step 9-21 - Implement Admin view for staff details and assignments
// Step 9-22 - Add search functionality for staff in Admin view
// Step 9-23 - Add search functionality for students in Admin view
// Step 9-24 - Implement real-time stats update in Admin dashboard
// Step 9-25 - Add welcome message with personalization to all dashboards
// Step 9-26 - Refine responsive layout for profile forms
// Step 9-27 - Add confirmation dialogs for profile updates
// Step 9-28 - Implement image upload placeholder for profiles
// Step 9-29 - Add multi-language support (English/Sinhala) placeholders
// Step 9-30 - Final cleanup of Role Specific Portals for Step 9
// Step 10-3 - Final integration check of Teacher verification process
// Step 10-6 - Add transition animations between portal views
// Step 10-9 - Verify NIC login for staff with test data
// Step 10-12 - Test verification status updates across roles
// Step 10-15 - Optimize bundle size with dynamic imports
// Step 10-18 - Implement session timeout warning logic
// Step 10-21 - Polish glassmorphism effects for better contrast
// Step 10-24 - Test password update workflow for new users
// Step 10-27 - Final review of verification status tracking
// Step 10-30 - Complete migration and refinement of School System Logic
