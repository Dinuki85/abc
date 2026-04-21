"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
  Users, UserCheck, Users2, Layers, BookOpen, GraduationCap, 
  ClipboardList, Briefcase, HeartHandshake, Settings, 
  Calendar, Award, Trophy, Star, FileText, UserCircle, Clock
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
    <div className="bg-white min-h-screen font-sans text-slate-800 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Dash Board</h1>
          <div className="mt-2">
             <h2 className="text-2xl font-black text-center px-4">Welcome To Andiambalama Maha Vidhyalaya</h2>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border border-green-600 flex items-center justify-center text-[10px] text-green-600 font-bold mb-1">
            Sch Logo
          </div>
        </div>

        <div className="flex flex-col items-end text-sm font-bold text-slate-700 space-y-1">
          <div className="flex gap-2">
            <span>Loged User Name</span>
            <span className="text-blue-600">{displayName}</span>
          </div>
          <div className="flex gap-2">
            <span>Macine Time</span>
            <span className="text-blue-600">{time}</span>
          </div>
          <button className="text-blue-600 hover:underline">Log out</button>
        </div>
      </div>

      {/* DB Counts Row */}
      <div className="grid grid-cols-5 gap-0 border border-slate-300 mb-8">
        {[
          { label: 'Students', value: stats?.totalStudents || '0' },
          { label: 'Academic Staff', value: stats?.academicStaffCount || '0' },
          { label: 'Non Academic Staff', value: stats?.nonAcademicStaffCount || '0' },
          { label: 'Sections', value: stats?.totalSections || '0' },
          { label: 'Class Rooms', value: stats?.totalClassRooms || '0' },
        ].map((stat, i) => (
          <div key={i} className="border-r last:border-r-0 border-slate-300 p-4 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">db Count</p>
            <p className="text-lg font-black">{stat.label}</p>
            <p className="text-xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Sections Grid */}
      <div className="space-y-4">
        {/* Administration Section */}
        <div className="border-2 border-slate-800 rounded-sm">
          <div className="bg-[#d9ead3] p-2 border-b-2 border-slate-800">
            <h3 className="text-xl font-black">Administration</h3>
            <p className="text-sm font-bold italic">Create your School Basic Profiles</p>
          </div>
          <div className="bg-[#d9ead3] p-4">
             <div className="grid grid-cols-5 gap-x-4 gap-y-2">
               {[
                 { name: 'Student', href: '/admin/students' },
                 { name: 'Staff', href: '/admin/staff' },
                 { name: 'Guardian', href: '/admin/parents' },
                 { name: 'Section', href: '/admin/grades' },
                 { name: 'Subject', href: '/admin/subjects' },
                 { name: 'Class', href: '/admin/classes' },
                 { name: 'Assesment', href: '#' },
                 { name: 'Co-Curriculer', href: '#' },
                 { name: 'Sport', href: '#' },
                 { name: 'User', href: '/admin/users' },
                 { name: 'Scholership', href: '#' },
                 { name: 'Sportmeet', href: '#' },
                 { name: 'Event', href: '#' },
               ].map((btn, i) => (
                 <Link 
                   key={i} 
                   href={btn.href}
                   className="bg-[#ebf5e9] border border-slate-800 py-1.5 px-2 text-center text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                 >
                   {btn.name}
                 </Link>
               ))}
             </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="border-2 border-slate-800 rounded-sm">
          <div className="bg-[#fce5cd] p-2 border-b-2 border-slate-800">
            <h3 className="text-xl font-black">Registration</h3>
            <p className="text-sm font-bold italic">Add Students and staff</p>
          </div>
          <div className="bg-[#fce5cd] p-4">
            <div className="grid grid-cols-5 gap-x-4 gap-y-2">
               {[
                 { name: 'Add To classes', href: '/admin/assignment' },
                 { name: 'Add To Sport', href: '#' },
                 { name: 'Add To Co- Activities', href: '#' },
                 { name: 'Time Table', href: '#' },
                 { name: 'Scholership', href: '#' },
                 { name: 'Add To Event', href: '#' },
                 { name: 'Add To Subject', href: '#' },
                 { name: 'Add To Assesment', href: '#' },
               ].map((btn, i) => (
                 <Link 
                   key={i} 
                   href={btn.href}
                   className="bg-[#fff2e2] border border-slate-800 py-1.5 px-2 text-center text-sm font-bold text-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                 >
                   {btn.name}
                 </Link>
               ))}
             </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="border-2 border-slate-800 rounded-sm">
          <div className="bg-[#cfe2f3] p-2 border-b-2 border-slate-800">
            <h3 className="text-xl font-black">Prefomance</h3>
            <p className="text-sm font-bold italic">Enter profomance</p>
          </div>
          <div className="bg-[#cfe2f3] p-4">
            <div className="grid grid-cols-5 gap-x-4 gap-y-2">
               {[
                 { name: 'Exam result', href: '#' },
                 { name: 'Scholership Distribution', href: '#' },
                 { name: 'Sport Places', href: '#' },
                 { name: 'Welfair Payment', href: '#' },
                 { name: 'Welfair Payment', href: '#' },
                 { name: 'S1 Form', href: '#' },
                 { name: 'Exam result', href: '#' },
                 { name: 'Assesment result', href: '#' },
               ].map((btn, i) => (
                 <Link 
                   key={i} 
                   href={btn.href}
                   className="bg-[#e7f0f7] border border-slate-800 py-1.5 px-2 text-center text-sm font-bold text-blue-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                 >
                   {btn.name}
                 </Link>
               ))}
             </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="border-2 border-slate-800 rounded-sm">
          <div className="bg-[#fff2cc] p-2 border-b-2 border-slate-800">
            <h3 className="text-xl font-black">Display</h3>
          </div>
          <div className="bg-[#fff2cc] p-0">
             <div className="grid grid-cols-4 divide-x-2 divide-slate-800">
               {/* Column 1: All School */}
               <div className="p-4">
                 <div className="bg-[#fff2cc] border-b-2 border-slate-800 -mx-4 -mt-4 p-1 mb-4 text-center font-bold">All School</div>
                 <ul className="space-y-1 text-xs font-bold underline decoration-slate-400">
                   <li><Link href="#">All List</Link></li>
                   <li><Link href="#">Welfair paid/not paid List</Link></li>
                   <li><Link href="#">Health Report</Link></li>
                   <li><Link href="#">Skill Report</Link></li>
                   <li><Link href="#">Contact Report</Link></li>
                   <li><Link href="#">Exam Report</Link></li>
                 </ul>
               </div>

               {/* Column 2: Student List */}
               <div className="p-4">
                 <div className="bg-[#fff2cc] border-b-2 border-slate-800 -mx-4 -mt-4 p-1 mb-4 text-center font-bold">Student List</div>
                 <ul className="space-y-1 text-xs font-bold underline decoration-slate-400">
                   <li><Link href="#">Section Based All Student</Link></li>
                   <li><Link href="#">Sport Based All Student</Link></li>
                   <li><Link href="#">Scholership Based All Student</Link></li>
                   <li><Link href="#">Religeon Based All Student</Link></li>
                   <li><Link href="#">Nationality Based All Student</Link></li>
                   <li><Link href="#">Gender Based All Student</Link></li>
                 </ul>
               </div>

               {/* Column 3: Teacher */}
               <div className="p-4">
                 <div className="bg-[#fff2cc] border-b-2 border-slate-800 -mx-4 -mt-4 p-1 mb-4 text-center font-bold">Teacher</div>
                 <div className="grid grid-cols-2 gap-4">
                    <ul className="space-y-1 text-xs font-bold underline decoration-slate-400">
                      <li><Link href="#">Exam Wise Report</Link></li>
                      <li><Link href="#">Subject Wise Report</Link></li>
                      <li><Link href="#">Mask Wise Report</Link></li>
                      <li><Link href="#">Grade Wise Report</Link></li>
                      <li><Link href="#">Sport Wise Report</Link></li>
                    </ul>
                    <ul className="space-y-1 text-xs font-bold underline decoration-slate-400">
                      <li><Link href="#">Class Teacher List</Link></li>
                      <li><Link href="#">Teacher Incharge List</Link></li>
                      <li><Link href="#">Subject Wise List</Link></li>
                    </ul>
                 </div>
               </div>

               {/* Column 4: Individual */}
               <div className="p-4">
                 <div className="bg-[#fff2cc] border-b-2 border-slate-800 -mx-4 -mt-4 p-1 mb-4 text-center font-bold">Individual</div>
                 <ul className="space-y-1 text-xs font-bold underline decoration-slate-400">
                   <li><Link href="#">Student CV</Link></li>
                   <li><Link href="#">Teacher CV</Link></li>
                   <li><Link href="#">Guardian CV</Link></li>
                   <li><Link href="#">Teacher Timetable</Link></li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
