"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Users, UserCheck, Users2, Layers, BookOpen, GraduationCap, 
  ClipboardList, Briefcase, HeartHandshake, Settings, 
  Calendar, Award, Trophy, Star, FileText, UserCircle, Clock, 
  ExternalLink, LogOut, LayoutDashboard, PlusCircle, PieChart, 
  FileSpreadsheet, UserPlus, BookCheck, Medal, CheckCircle2,
  Activity, Phone, FileCheck, BarChart3, UserSquare2, Contact,
  ArrowUpRight, Sparkles, Command, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    api.getAdminStats().then(setStats);
    
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    
    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    return () => clearInterval(timer);
  }, []);
  
  const currentUser = api.getCurrentUser();
  const displayName = currentUser?.username || 'Admin';

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden">
      {/* Ultra-Premium Mesh Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 p-6 md:p-10 max-w-[1600px] mx-auto space-y-12">
        {/* State-of-the-art Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20">
                <Command size={20} className="text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
                System <span className="text-blue-500">Core</span>
              </h1>
            </div>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              Andiambalama Maha Vidhyalaya Management Portal
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Real-time Clock Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-2xl">
              <Clock size={20} className="text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">System Time</span>
                <span className="text-lg font-black text-white tabular-nums tracking-tighter">{time}</span>
              </div>
            </div>

            {/* Profile Card */}
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2 pr-6 rounded-2xl shadow-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                <UserCircle size={28} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Shield size={10} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authorized Admin</span>
                </div>
                <span className="text-sm font-black text-white">{displayName}</span>
              </div>
            </div>

            <button className="p-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-2xl transition-all border border-rose-500/20 hover:border-rose-500/40">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          {[
            { label: 'Students', value: stats?.totalStudents || '0', icon: GraduationCap, color: 'from-blue-600 to-cyan-500', shadow: 'shadow-blue-500/20' },
            { label: 'Academic Staff', value: stats?.academicStaffCount || '0', icon: Briefcase, color: 'from-emerald-600 to-teal-500', shadow: 'shadow-emerald-500/20' },
            { label: 'Non Academic', value: stats?.nonAcademicStaffCount || '0', icon: Users, color: 'from-indigo-600 to-purple-500', shadow: 'shadow-indigo-500/20' },
            { label: 'Sections', value: stats?.totalSections || '0', icon: Layers, color: 'from-amber-600 to-orange-500', shadow: 'shadow-amber-500/20' },
            { label: 'Class Rooms', value: stats?.totalClassRooms || '0', icon: BookOpen, color: 'from-rose-600 to-pink-500', shadow: 'shadow-rose-500/20' },
          ].map((stat, i) => (
            <div key={i} className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all hover:-translate-y-2">
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-[2.5rem]`} />
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} ${stat.shadow} text-white`}>
                  <stat.icon size={24} />
                </div>
                <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-black text-white tabular-nums tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Bento Grid Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Administration - Large Bento Item */}
          <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden group hover:border-emerald-500/30 transition-all animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-emerald-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Settings size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Administration</h2>
                  <p className="text-slate-400 text-sm font-medium">Core System Profiles & Infrastructure</p>
                </div>
              </div>
              <div className="hidden md:block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Control Panel</div>
            </div>
            <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Student', href: '/admin/students', icon: UserPlus },
                { name: 'Staff', href: '/admin/staff', icon: Briefcase },
                { name: 'Guardian', href: '/admin/parents', icon: HeartHandshake },
                { name: 'Section', href: '/admin/grades', icon: Layers },
                { name: 'Subject', href: '/admin/subjects', icon: BookCheck },
                { name: 'Class', href: '/admin/classes', icon: BookOpen },
                { name: 'Assessment', href: '#', icon: ClipboardList },
                { name: 'Co-Curricular', href: '#', icon: Star },
                { name: 'Sport', href: '#', icon: Trophy },
                { name: 'User', href: '/admin/users', icon: UserCircle },
                { name: 'Scholarship', href: '#', icon: GraduationCap },
                { name: 'Sportmeet', href: '#', icon: Medal },
                { name: 'Event', href: '#', icon: Calendar },
              ].map((btn, i) => (
                <Link key={i} href={btn.href} className="group/btn flex flex-col items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all active:scale-95 shadow-lg">
                  <btn.icon size={24} className="text-slate-500 group-hover/btn:text-emerald-400 group-hover/btn:scale-110 transition-all mb-3" />
                  <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-white uppercase tracking-widest text-center transition-colors">{btn.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Registration - Small Bento Item */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden group hover:border-orange-500/30 transition-all animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            <div className="p-8 border-b border-white/5 bg-orange-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <PlusCircle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Entry</h2>
                  <p className="text-slate-400 text-sm font-medium">Registry & Assignments</p>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-2 gap-4">
               {[
                 { name: 'Classes', href: '/admin/assignment', icon: UserCheck },
                 { name: 'Sport', href: '#', icon: Trophy },
                 { name: 'Co-Acts', href: '#', icon: Star },
                 { name: 'Schedule', href: '#', icon: Calendar },
                 { name: 'Grants', href: '#', icon: GraduationCap },
                 { name: 'Events', href: '#', icon: Calendar },
                 { name: 'Subjects', href: '#', icon: BookCheck },
                 { name: 'Assists', href: '#', icon: ClipboardList },
               ].map((btn, i) => (
                <Link key={i} href={btn.href} className="group/btn flex flex-col items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all active:scale-95 shadow-lg">
                  <btn.icon size={24} className="text-slate-500 group-hover/btn:text-orange-400 transition-all mb-3" />
                  <span className="text-[11px] font-black text-slate-400 group-hover/btn:text-white uppercase tracking-widest text-center transition-colors">{btn.name}</span>
                </Link>
               ))}
             </div>
          </div>

          {/* Performance - Small Bento Item */}
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden group hover:border-blue-500/30 transition-all animate-in fade-in slide-in-from-left-4 duration-1000 delay-400">
            <div className="p-8 border-b border-white/5 bg-blue-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <PieChart size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Analysis</h2>
                  <p className="text-slate-400 text-sm font-medium">Performance Metrics</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-4">
               {[
                 { name: 'Exam Results', icon: CheckCircle2 },
                 { name: 'Scholarship Tracking', icon: GraduationCap },
                 { name: 'Sport Achievements', icon: Trophy },
                 { name: 'Welfare Processing', icon: HeartHandshake },
                 { name: 'S1 Data Entry', icon: FileSpreadsheet },
               ].map((btn, i) => (
                <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all text-left group/row">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/row:scale-110 transition-transform">
                    <btn.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-300 group-hover/row:text-white transition-colors">{btn.name}</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-20 group-hover/row:opacity-100 transition-opacity" />
                </button>
               ))}
             </div>
          </div>

          {/* Reports - Large Bento Item */}
          <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden group hover:border-amber-500/30 transition-all animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
            <div className="p-8 border-b border-white/5 bg-amber-500/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/20">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Intelligence</h2>
                  <p className="text-slate-400 text-sm font-medium">Advanced Reporting & Documentation</p>
                </div>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-8 h-[2px] bg-amber-500/30" /> School Records
                 </h4>
                 <div className="grid grid-cols-1 gap-3">
                   {[
                     { name: 'Comprehensive All List', icon: Users },
                     { name: 'Welfare Eligibility File', icon: HeartHandshake },
                     { name: 'Health & Medical Logs', icon: Activity },
                     { name: 'Skill Matrix Export', icon: Award },
                     { name: 'Emergency Contacts', icon: Phone },
                     { name: 'Official Exam Ledger', icon: FileCheck },
                   ].map((item, i) => (
                     <Link key={i} href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group/link transition-all border border-transparent hover:border-white/5">
                       <item.icon size={16} className="text-slate-500 group-hover/link:text-amber-400 transition-colors" />
                       <span className="text-sm font-medium text-slate-400 group-hover/link:text-slate-200 transition-colors">{item.name}</span>
                     </Link>
                   ))}
                 </div>
               </div>

               <div className="space-y-6">
                 <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-8 h-[2px] bg-amber-500/30" /> Personnel Data
                 </h4>
                 <div className="grid grid-cols-1 gap-3">
                   {[
                     { name: 'Teacher Professional Profiles', icon: Briefcase },
                     { name: 'Subject Allocation Matrix', icon: BookCheck },
                     { name: 'Student Digital CV Builder', icon: UserSquare2 },
                     { name: 'Staff Identification Files', icon: Contact },
                     { name: 'Dynamic Master Timetable', icon: Calendar },
                   ].map((item, i) => (
                     <Link key={i} href="#" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 group/link transition-all border border-transparent hover:border-white/5">
                       <item.icon size={16} className="text-slate-500 group-hover/link:text-amber-400 transition-colors" />
                       <span className="text-sm font-medium text-slate-400 group-hover/link:text-slate-200 transition-colors">{item.name}</span>
                     </Link>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Bottom Decor */}
      <div className="h-24 bg-gradient-to-t from-blue-600/5 to-transparent mt-20" />
    </div>
  );
}
