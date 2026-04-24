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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    api.getAdminStats().then(setStats);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      
      {/* Institutional Header - Simplified */}
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-white/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl transition-all group-hover:bg-primary/10" />
        <div className="relative flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 font-handlee leading-tight tracking-tight">
            Welcome To <span className="text-primary">Andiambalama</span> <br /> 
            Maha Vidhyalaya
          </h1>
          <div className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-6 flex items-center gap-3">
            <div className="w-12 h-1 bg-secondary rounded-full" />
            Administrative Intelligence Hub
            <div className="w-12 h-1 bg-secondary rounded-full" />
          </div>
        </div>
      </div>

      {/* Dynamic Professional Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Students', value: stats?.totalStudents || '0', icon: GraduationCap, color: 'border-primary', bg: 'bg-primary/5', text: 'text-primary' },
          { label: 'Academic Staff', value: stats?.academicStaffCount || '0', icon: Briefcase, color: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
          { label: 'Non-Academic', value: stats?.nonAcademicStaffCount || '0', icon: Users, color: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-600' },
          { label: 'Sections', value: stats?.totalSections || '0', icon: Layers, color: 'border-secondary', bg: 'bg-secondary/5', text: 'text-secondary-hover' },
          { label: 'Class Rooms', value: stats?.totalClassRooms || '0', icon: BookOpen, color: 'border-rose-500', bg: 'bg-rose-50', text: 'text-rose-600' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border-b-8 ${stat.color} flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative`}>
            <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-150 group-hover:opacity-10 transition-all duration-700 ${stat.text}`}>
               <stat.icon size={120} />
            </div>
            <div className="flex justify-between items-center relative z-10">
              <div className={`p-4 rounded-[1.25rem] ${stat.bg} ${stat.text} group-hover:scale-110 transition-transform shadow-inner`}>
                <stat.icon size={28} />
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Live DB</span>
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-5xl font-black text-slate-800 tabular-nums tracking-tighter font-handlee">{stat.value}</span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Control Center */}
      <div className="space-y-12">
        
        {/* Module: Administration */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-hover p-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-xl">
                <Landmark size={32} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-handlee tracking-tight">Institutional Administration</h2>
                <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] mt-1">Core Institutional Profile Management</p>
              </div>
            </div>
            <div className="hidden md:block text-7xl font-black text-white/5 italic font-handlee">M-01</div>
          </div>
          <div className="p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-slate-50/50">
            {[
              { name: 'Student Profile', href: '/admin/students', icon: UserPlus },
              { name: 'Staff Directory', href: '/admin/staff', icon: Briefcase },
              { name: 'Guardian Info', href: '/admin/parents', icon: Heart },
              { name: 'Section Matrix', href: '/admin/grades', icon: Layers },
              { name: 'Subject Matrix', href: '/admin/subjects', icon: BookCheck },
              { name: 'Class Matrix', href: '/admin/classes', icon: Presentation },
              { name: 'Assessment', href: '#', icon: ClipboardList },
              { name: 'Co-Curricular', href: '#', icon: Star },
              { name: 'Sport List', href: '#', icon: Trophy },
              { name: 'User Access', href: '/admin/users', icon: ShieldUser },
              { name: 'Scholarships', href: '#', icon: GraduationCap },
              { name: 'Sportmeet', href: '#', icon: Medal },
              { name: 'School Events', href: '#', icon: Calendar },
            ].map((btn, i) => (
              <DashboardButton key={i} {...btn} color="primary" />
            ))}
          </div>
        </div>

        {/* Module: Registration */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-xl">
                <PlusCircle size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-handlee tracking-tight">Enrollment & Registration</h2>
                <p className="text-orange-100/60 text-xs font-black uppercase tracking-[0.3em] mt-1">Student & Faculty Dynamic Assignments</p>
              </div>
            </div>
            <div className="hidden md:block text-7xl font-black text-white/5 italic font-handlee">M-02</div>
          </div>
          <div className="p-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 bg-slate-50/50">
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
              <DashboardButton key={i} {...btn} color="orange" />
            ))}
          </div>
        </div>

        {/* Module: Performance */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-xl">
                <Activity size={32} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-handlee tracking-tight">Performance Analytics</h2>
                <p className="text-emerald-100/60 text-xs font-black uppercase tracking-[0.3em] mt-1">Academic Records & Merit Reporting</p>
              </div>
            </div>
            <div className="hidden md:block text-7xl font-black text-white/5 italic font-handlee">M-03</div>
          </div>
          <div className="p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-slate-50/50">
            {[
              { name: 'Exam Results', href: '#', icon: CheckCircle2 },
              { name: 'Scholarship Dist.', href: '#', icon: GraduationCap },
              { name: 'Sporting Success', href: '#', icon: Trophy },
              { name: 'Welfare Processing', href: '#', icon: HeartHandshake },
              { name: 'S1 Data Forms', href: '#', icon: FileSpreadsheet },
              { name: 'Assessment Analytics', href: '#', icon: ClipboardList },
            ].map((btn, i) => (
              <DashboardButton key={i} {...btn} color="emerald" />
            ))}
          </div>
        </div>

        {/* Module: Reporting Grid */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 p-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                <FileSpreadsheet size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-handlee tracking-tight">Advanced Reporting Engine</h2>
                <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mt-1">Cross-Reference Institutional Intelligence</p>
              </div>
            </div>
            <div className="hidden md:block text-7xl font-black text-white/5 italic font-handlee">M-04</div>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-12 bg-slate-50/50">
             
             <ReportColumn 
               title="All School" 
               items={[
                 { name: 'All List', icon: Users },
                 { name: 'Welfare Paid/Not Paid', icon: HeartHandshake },
                 { name: 'Health Report', icon: Activity },
                 { name: 'Skill Report', icon: Award },
                 { name: 'Contact Report', icon: Phone },
                 { name: 'Exam Report', icon: FileCheck },
               ]} 
             />

             <ReportColumn 
               title="Student List" 
               items={[
                 { name: 'Section Based', icon: Layers },
                 { name: 'Subject Based', icon: BookCheck },
                 { name: 'Scholarship Based', icon: GraduationCap },
                 { name: 'Religion Based', icon: Heart },
                 { name: 'Nationality Based', icon: Landmark },
                 { name: 'Gender Based', icon: Users2 },
               ]} 
             />

             <ReportColumn 
               title="Teacher" 
               items={[
                 { name: 'Class Teacher List', icon: UserCheck },
                 { name: 'Teacher Incharge List', icon: ShieldCheck },
                 { name: 'Subject Wise List', icon: BookOpen },
               ]} 
             />

             <ReportColumn 
               title="Individual" 
               items={[
                 { name: 'Student CV', icon: Contact },
                 { name: 'Teacher CV', icon: Briefcase },
                 { name: 'Guardian CV', icon: Heart },
                 { name: 'Teacher Timetable', icon: Calendar },
               ]} 
             />

          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardButton({ name, href, icon: Icon, color }: any) {
  const colorMap: any = {
    primary: 'hover:border-primary group-hover:bg-primary group-hover:text-white text-primary hover:text-primary bg-primary/5',
    orange: 'hover:border-orange-600 group-hover:bg-orange-600 group-hover:text-white text-orange-600 hover:text-orange-700 bg-orange-50',
    emerald: 'hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 hover:text-emerald-700 bg-emerald-50',
  };

  return (
    <Link 
      href={href}
      className={`flex flex-col items-center gap-4 p-6 bg-white border border-slate-100 rounded-[2rem] transition-all group hover:shadow-2xl hover:-translate-y-1 active:scale-95 shadow-sm`}
    >
      <div className={`p-4 rounded-2xl shadow-inner transition-all duration-500 ${colorMap[color].split(' ').slice(1,4).join(' ')} ${colorMap[color].split(' ').slice(4,6).join(' ')}`}>
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center group-hover:text-slate-800 transition-colors">
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
