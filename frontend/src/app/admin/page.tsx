"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Users, UserCheck, Users2, Layers, BookOpen, GraduationCap, 
  ClipboardList, Briefcase, HeartHandshake, Settings, 
  Calendar, Award, Trophy, Star, FileText, UserCircle, Clock, 
  ExternalLink, LogOut, LayoutDashboard, PlusCircle, PieChart, 
  FileSpreadsheet, UserPlus, BookCheck, Medal, CheckCircle2,
  Activity, Phone, FileCheck, BarChart3, UserSquare2, Contact
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
  const displayName = currentUser?.username || 'User';

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 animate-in fade-in duration-700 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Premium Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
              <LayoutDashboard size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          </div>
          <p className="text-slate-500 font-medium ml-12">Welcome back to Andiambalama Maha Vidhyalaya Portal</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* User Profile Info */}
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-2 pr-6 rounded-2xl shadow-sm border border-white/50">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <UserCircle size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin User</span>
              <span className="text-sm font-black text-slate-800">{displayName}</span>
            </div>
          </div>

          {/* Time Card */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white/50">
            <Clock size={20} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Time</span>
              <span className="text-sm font-black text-slate-800 tracking-wider">{time}</span>
            </div>
          </div>

          <button className="p-3 bg-rose-50/50 backdrop-blur-md text-rose-600 rounded-2xl hover:bg-rose-100 transition-colors shadow-sm border border-rose-100/50">
            <LogOut size={22} />
          </button>
        </div>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {[
          { label: 'Students', value: stats?.totalStudents || '0', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Academic Staff', value: stats?.academicStaffCount || '0', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Non Academic', value: stats?.nonAcademicStaffCount || '0', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Sections', value: stats?.totalSections || '0', icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Class Rooms', value: stats?.totalClassRooms || '0', icon: BookOpen, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Database</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Count</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Action Modules */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Administration Module */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
          <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Settings size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Administration</h2>
                <p className="text-emerald-100 text-sm font-medium mt-1">Manage School Basic Profiles</p>
              </div>
            </div>
            <span className="text-4xl font-black text-white/10 uppercase italic">Admin</span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                <Link 
                  key={i} 
                  href={btn.href}
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100 transition-all group active:scale-95"
                >
                  <btn.icon size={22} className="text-slate-400 group-hover:text-emerald-600 mb-2 transition-colors" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors text-center">{btn.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Module */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <div className="bg-orange-500 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <PlusCircle size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Registration</h2>
                <p className="text-orange-100 text-sm font-medium mt-1">Add Students and Staff Records</p>
              </div>
            </div>
            <span className="text-4xl font-black text-white/10 uppercase italic">Entry</span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {[
                 { name: 'Add To classes', href: '/admin/assignment', icon: UserCheck },
                 { name: 'Add To Sport', href: '#', icon: Trophy },
                 { name: 'Co-Activities', href: '#', icon: Star },
                 { name: 'Time Table', href: '#', icon: Calendar },
                 { name: 'Scholarship', href: '#', icon: GraduationCap },
                 { name: 'Add To Event', href: '#', icon: Calendar },
                 { name: 'Add To Subject', href: '#', icon: BookCheck },
                 { name: 'Add To Assessment', href: '#', icon: ClipboardList },
               ].map((btn, i) => (
                <Link 
                  key={i} 
                  href={btn.href}
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-orange-50 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100 transition-all group active:scale-95"
                >
                  <btn.icon size={22} className="text-slate-400 group-hover:text-orange-600 mb-2 transition-colors" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-orange-700 transition-colors text-center">{btn.name}</span>
                </Link>
               ))}
             </div>
          </div>
        </section>

        {/* Performance Module */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <PieChart size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Performance</h2>
                <p className="text-blue-100 text-sm font-medium mt-1">Enter Student & School Achievement Data</p>
              </div>
            </div>
            <span className="text-4xl font-black text-white/10 uppercase italic">Stats</span>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {[
                 { name: 'Exam Results', href: '#', icon: CheckCircle2 },
                 { name: 'Scholarship Dist.', href: '#', icon: GraduationCap },
                 { name: 'Sport Places', href: '#', icon: Trophy },
                 { name: 'Welfare Payment', href: '#', icon: HeartHandshake },
                 { name: 'S1 Form', href: '#', icon: FileSpreadsheet },
                 { name: 'Assessment Results', href: '#', icon: ClipboardList },
               ].map((btn, i) => (
                <Link 
                  key={i} 
                  href={btn.href}
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 transition-all group active:scale-95"
                >
                  <btn.icon size={22} className="text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors text-center">{btn.name}</span>
                </Link>
               ))}
             </div>
          </div>
        </section>

        {/* Display Module */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both">
          <div className="bg-amber-500 p-6 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Display</h2>
                <p className="text-amber-100 text-sm font-medium mt-1">Generate Reports and Student Lists</p>
              </div>
            </div>
            <span className="text-4xl font-black text-white/10 uppercase italic">Reports</span>
          </div>
          <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
               <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest border-l-4 border-amber-500 pl-3">All School & Lists</h4>
               <ul className="space-y-2">
                 {[
                   { name: 'All List', icon: Users },
                   { name: 'Welfare Status List', icon: HeartHandshake },
                   { name: 'Health Reports', icon: Activity },
                   { name: 'Skill Matrix', icon: Award },
                   { name: 'Contact Directory', icon: Phone },
                   { name: 'Exam Reports', icon: FileCheck },
                   { name: 'Section Based List', icon: Layers },
                   { name: 'Sport Based List', icon: Trophy },
                   { name: 'Scholarship List', icon: GraduationCap },
                   { name: 'Nationality/Religion/Gender', icon: Users2 }
                 ].map((item, i) => (
                   <li key={i}>
                     <Link href="#" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors group">
                       <item.icon size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" /> {item.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>

             <div className="space-y-4">
               <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest border-l-4 border-amber-500 pl-3">Teacher & Individual</h4>
               <ul className="space-y-2">
                 {[
                   { name: 'Exam Wise Analysis', icon: PieChart },
                   { name: 'Subject Wise Analysis', icon: BookCheck },
                   { name: 'Grade Wise Comparison', icon: BarChart3 },
                   { name: 'Teacher Lists', icon: Briefcase },
                   { name: 'Subject Specialist List', icon: ClipboardList },
                   { name: 'Student CV Generator', icon: UserSquare2 },
                   { name: 'Teacher Professional CV', icon: Contact },
                   { name: 'Guardian Contact File', icon: Users2 },
                   { name: 'Teacher Timetables', icon: Calendar }
                 ].map((item, i) => (
                   <li key={i}>
                     <Link href="#" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors group">
                       <item.icon size={14} className="text-slate-400 group-hover:text-amber-500 transition-colors" /> {item.name}
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
