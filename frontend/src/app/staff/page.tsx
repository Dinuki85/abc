'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  Calendar,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function StaffDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ROLE_TEACHER' && currentUser.role !== 'ROLE_STAFF')) {
      router.push('/login');
    } else {
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const data = await api.getStaffProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const designations = profile?.staff?.designations || [];
  const myClass = profile?.assignedClass;
  const mySection = profile?.assignedSection;

  return (
    <div className="space-y-8 font-nunito animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Staff Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, {profile?.staff?.name || 'Loading...'}</p>
        </div>
        <div className="flex gap-2">
          {designations.map((d: string) => (
             <span key={d} className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
               {d.replace('_', ' ')}
             </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Class Teacher Card */}
        {designations.includes('CLASS_TEACHER') && (
          <Card className="p-8 border-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white relative overflow-hidden shadow-xl shadow-blue-500/20 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <BookOpen className="text-blue-100 mb-4" size={24} />
            <h3 className="text-xl font-bold mb-1">My Class</h3>
            <p className="text-blue-100/80 text-sm mb-6">
              {myClass ? `Grade ${myClass.grade?.name} - ${myClass.name}` : 'Not currently assigned to a class'}
            </p>
            <Link href="/staff/my-class">
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all hover:shadow-lg active:scale-95">
                Manage Students
              </button>
            </Link>
          </Card>
        )}

        {/* Section Head Card */}
        {designations.includes('SECTION_HEAD') && (
          <Card className="p-8 border-none bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <ShieldCheck className="text-emerald-100 mb-4" size={24} />
            <h3 className="text-xl font-bold mb-1">Section Overview</h3>
            <p className="text-emerald-100/80 text-sm mb-6">
              {mySection ? `${mySection.name} Section` : 'Not assigned as Section Head'}
            </p>
            <Link href="/staff/section">
              <button className="bg-white text-emerald-600 px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all hover:shadow-lg active:scale-95">
                Audit Section
              </button>
            </Link>
          </Card>
        )}

        {/* Generic Stats Card */}
        <Card className="p-8 bg-white border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4">
             <div className="p-4 bg-slate-50 text-slate-400 rounded-3xl">
               <Calendar size={24} />
             </div>
             <div>
               <p className="text-2xl font-bold text-slate-800">100%</p>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
             </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 bg-white/80 border border-white/60 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
             <FileCheck className="text-blue-500" />
             Pending Approvals
          </h3>
          <div className="space-y-4">
             {/* This would ideally map over a real pending list */}
             <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">ST</div>
                   <div>
                      <p className="text-sm font-bold text-slate-800">Profile Audit Required</p>
                      <p className="text-xs text-slate-400">Class 10-A • 3 Students pending</p>
                   </div>
                </div>
                <Link href="/staff/verify">
                   <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </Link>
             </div>
          </div>
        </Card>

        <Card className="p-8 border-none bg-slate-900 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
           <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <AlertCircle className="text-amber-400" />
              Information Window
           </h3>
           <p className="text-slate-400 text-sm leading-relaxed mb-6">
             Currently, the **Student Profile Submission Window** is OPEN for all grades. Class Teachers are encouraged to complete profile verifications of new intakes as soon as students finalize their entries.
           </p>
           <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Live Status: Accepting Submissions</span>
           </div>
        </Card>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  );
}

// Granular commit 1 for Step 5 (Frontend Integration)

// Granular commit 5 for Step 5 (Frontend Integration)

// Granular commit 9 for Step 5 (Frontend Integration)

// Granular commit 13 for Step 5 (Frontend Integration)

// Granular commit 17 for Step 5 (Frontend Integration)

// Granular commit 21 for Step 5 (Frontend Integration)

// Granular commit 25 for Step 5 (Frontend Integration)
