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
  School, Landmark, ShieldCheck, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    api.getAdminStats().then(setStats);
    
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const currentUser = api.getCurrentUser();
  const displayName = currentUser?.username || 'Administrator';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Top Professional Header */}
      <header className="bg-[#1e3a8a] text-white shadow-lg border-b-4 border-amber-500 relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#1e3a8a] shadow-inner border-2 border-white">
              <School size={36} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black uppercase tracking-tight leading-none italic">Andiambalama Maha Vidhyalaya</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[2px] w-8 bg-amber-500 rounded-full" />
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.3em]">Institutional Management Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end border-r border-blue-700/50 pr-8">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em]">Real-time Status</span>
              <div className="flex items-center gap-2 text-lg font-black tabular-nums tracking-wider">
                <Clock size={16} className="text-amber-500" />
                {time}
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-[#1e3a8a] font-black shadow-lg ring-2 ring-white/20 group-hover:ring-amber-500/50 transition-all">
                {displayName[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={10} className="text-amber-500" />
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">Active Admin</span>
                </div>
                <span className="text-sm font-black">{displayName}</span>
              </div>
            </div>

            <button className="p-3 hover:bg-rose-500/20 hover:text-rose-400 rounded-xl transition-all text-white/70">
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Dynamic Professional Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { label: 'Students', value: stats?.totalStudents || '0', icon: GraduationCap, color: 'border-blue-700', bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'Academic Staff', value: stats?.academicStaffCount || '0', icon: Briefcase, color: 'border-emerald-700', bg: 'bg-emerald-50', text: 'text-emerald-700' },
            { label: 'Non-Academic', value: stats?.nonAcademicStaffCount || '0', icon: Users, color: 'border-indigo-700', bg: 'bg-indigo-50', text: 'text-indigo-700' },
            { label: 'Sections', value: stats?.totalSections || '0', icon: Layers, color: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-600' },
            { label: 'Class Rooms', value: stats?.totalClassRooms || '0', icon: BookOpen, color: 'border-rose-700', bg: 'bg-rose-50', text: 'text-rose-700' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${stat.color} flex flex-col gap-4 hover:shadow-md hover:-translate-y-1 transition-all group`}>
              <div className="flex justify-between items-center">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.text} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Stats</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-slate-800 tabular-nums tracking-tighter">{stat.value}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">{stat.label}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Action Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Module 01: Administration */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-[#1e3a8a] px-8 py-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10">
                  <Landmark size={24} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Institutional Admin</h2>
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Base Profiles & Records</p>
                </div>
              </div>
              <span className="text-4xl font-black text-white/5 italic select-none">M-01</span>
            </div>
            <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Student Profile', href: '/admin/students', icon: UserPlus },
                { name: 'Staff Profile', href: '/admin/staff', icon: Briefcase },
                { name: 'Guardian Info', href: '/admin/parents', icon: HeartHandshake },
                { name: 'Section Matrix', href: '/admin/grades', icon: Layers },
                { name: 'Subject Matrix', href: '/admin/subjects', icon: BookCheck },
                { name: 'Class Matrix', href: '/admin/classes', icon: BookOpen },
                { name: 'Assessment', href: '#', icon: ClipboardList },
                { name: 'Co-Curricular', href: '#', icon: Star },
                { name: 'Sport List', href: '#', icon: Trophy },
                { name: 'User Management', href: '/admin/users', icon: UserCircle },
                { name: 'Scholarship', href: '#', icon: GraduationCap },
                { name: 'Sportmeet', href: '#', icon: Medal },
                { name: 'School Events', href: '#', icon: Calendar },
              ].map((btn, i) => (
                <Link 
                  key={i} 
                  href={btn.href}
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 transition-all group active:scale-95"
                >
                  <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <btn.icon size={16} />
                  </div>
                  <span className="text-[11px] font-black text-slate-600 group-hover:text-blue-700 tracking-tight">{btn.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Module 02: Registration */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-orange-600 px-8 py-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10">
                  <PlusCircle size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Active Registration</h2>
                  <p className="text-orange-100 text-[10px] font-bold uppercase tracking-widest">Student & Staff Assignments</p>
                </div>
              </div>
              <span className="text-4xl font-black text-white/5 italic select-none">M-02</span>
            </div>
            <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
               {[
                 { name: 'Add To Classes', href: '/admin/assignment', icon: UserCheck },
                 { name: 'Add To Sport', href: '#', icon: Trophy },
                 { name: 'Co-Activities', href: '#', icon: Star },
                 { name: 'Time Table', href: '#', icon: Calendar },
                 { name: 'Scholarship Enr.', href: '#', icon: GraduationCap },
                 { name: 'Event Registration', href: '#', icon: Calendar },
                 { name: 'Subject Assign', href: '#', icon: BookCheck },
                 { name: 'Assessment Assign', href: '#', icon: ClipboardList },
               ].map((btn, i) => (
                <Link 
                  key={i} 
                  href={btn.href}
                  className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-orange-600 hover:bg-white hover:shadow-lg hover:shadow-orange-900/5 transition-all group active:scale-95"
                >
                  <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                    <btn.icon size={16} />
                  </div>
                  <span className="text-[11px] font-black text-slate-600 group-hover:text-orange-700 tracking-tight">{btn.name}</span>
                </Link>
               ))}
             </div>
          </div>

          {/* Module 03: Performance */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-emerald-700 px-8 py-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10">
                  <PieChart size={24} className="text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Performance Analytics</h2>
                  <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Academic & Extracurricular Data</p>
                </div>
              </div>
              <span className="text-4xl font-black text-white/5 italic select-none">M-03</span>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {[
                   { name: 'Exam Results Entry', icon: CheckCircle2 },
                   { name: 'Scholarship Dist.', icon: GraduationCap },
                   { name: 'Sporting Success', icon: Trophy },
                   { name: 'Welfare Processing', icon: HeartHandshake },
                   { name: 'S1 Data Reporting', icon: FileSpreadsheet },
                   { name: 'Assessment Analytics', icon: ClipboardList },
                 ].map((btn, i) => (
                  <button key={i} className="flex flex-col items-center gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-600 hover:bg-white hover:shadow-xl transition-all group active:scale-95">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-all text-emerald-700">
                      <btn.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest text-center">{btn.name}</span>
                  </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Module 04: Display / Reports */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-amber-500 px-8 py-5 flex justify-between items-center text-[#1e3a8a]">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/20 rounded-xl border border-white/30">
                  <FileSpreadsheet size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Reporting Engine</h2>
                  <p className="text-blue-900/60 text-[10px] font-bold uppercase tracking-widest">School Lists & Personnel Reports</p>
                </div>
              </div>
              <span className="text-4xl font-black text-[#1e3a8a]/5 italic select-none">M-04</span>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-5">
                 <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                   <div className="w-6 h-[2px] bg-amber-500/30" /> School Records
                 </h4>
                 <div className="grid grid-cols-1 gap-2.5">
                   {[
                     { name: 'Comprehensive All List', icon: Users },
                     { name: 'Welfare Audit Logs', icon: HeartHandshake },
                     { name: 'Medical History Logs', icon: Activity },
                     { name: 'Faculty Skill Matrix', icon: Award },
                     { name: 'Institutional Directory', icon: Phone },
                     { name: 'Official Exam Reports', icon: FileCheck },
                   ].map((item, i) => (
                     <Link key={i} href="#" className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-blue-700 transition-all group">
                       <div className="p-1 bg-slate-100 rounded group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        <item.icon size={12} />
                       </div>
                       {item.name}
                     </Link>
                   ))}
                 </div>
               </div>

               <div className="space-y-5">
                 <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2">
                   <div className="w-6 h-[2px] bg-amber-500/30" /> Faculty & Files
                 </h4>
                 <div className="grid grid-cols-1 gap-2.5">
                   {[
                     { name: 'Subject-wise Teacher List', icon: Briefcase },
                     { name: 'Specialist Allocation List', icon: BookCheck },
                     { name: 'Student Digital Profile CV', icon: UserSquare2 },
                     { name: 'Staff Identification File', icon: Contact },
                     { name: 'Dynamic Room Timetable', icon: Calendar },
                   ].map((item, i) => (
                     <Link key={i} href="#" className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-blue-700 transition-all group">
                       <div className="p-1 bg-slate-100 rounded group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                        <item.icon size={12} />
                       </div>
                       {item.name}
                     </Link>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <School size={24} className="text-[#1e3a8a]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
              &copy; 2026 Andiambalama Maha Vidhyalaya Institutional Portal.<br/>
              Developed for Academic Excellence.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Server Status <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Security Protocol <ShieldCheck size={12} className="text-blue-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
