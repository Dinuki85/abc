"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Users, UserCheck, Users2, Layers, BookOpen, GraduationCap, ClipboardList, Briefcase, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.getAdminStats().then(setStats);
  }, []);
  
  const statCards = [
    { label: 'Students', value: stats?.totalStudents || '0', icon: GraduationCap, color: 'from-blue-600 to-cyan-500' },
    { label: 'Academic Staff', value: stats?.academicStaffCount || '0', icon: Briefcase, color: 'from-indigo-600 to-purple-500' },
    { label: 'Non Academic Staff', value: stats?.nonAcademicStaffCount || '0', icon: Users, color: 'from-slate-600 to-slate-500' },
    { label: 'Sections', value: stats?.totalSections || '0', icon: Layers, color: 'from-emerald-600 to-teal-500' },
    { label: 'Class Rooms', value: stats?.totalClassRooms || '0', icon: BookOpen, color: 'from-rose-600 to-orange-500' },
  ];

  const adminModules = [
    { name: 'Student', href: '/admin/students', icon: GraduationCap, description: 'Manage student profiles and records' },
    { name: 'Staff', href: '/admin/staff', icon: Briefcase, description: 'Manage academic and non-academic staff' },
    { name: 'Guardian', href: '/admin/parents', icon: HeartHandshake, description: 'Manage parent and guardian information' },
    { name: 'Section', href: '/admin/grades', icon: Layers, description: 'Manage school sections and grades' },
    { name: 'Subject', href: '/admin/subjects', icon: ClipboardList, description: 'Manage school subjects and curriculum' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
          Dash Board
        </h1>
        <div className="bg-blue-600 text-white py-4 px-8 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-between">
          <p className="text-xl font-bold tracking-wide">
            Welcome To Andiambalama Maha Vidhyalaya
          </p>
          <div className="hidden md:block w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
             <GraduationCap className="text-white" size={24} />
          </div>
        </div>
      </div>
      
      {/* DB Counts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 text-slate-600 group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Count</span>
            </div>
            <p className="text-3xl font-black text-slate-800">{stat.value}</p>
            <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Administration Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Administration
          </h2>
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create Profiles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, i) => (
            <Link 
              key={i} 
              href={module.href}
              className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                <module.icon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                  {module.name}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  {module.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
