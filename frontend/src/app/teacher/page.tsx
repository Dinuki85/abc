'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Users, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDashboard() {
  const [myClass, setMyClass] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classData = await api.getMyClass();
      setMyClass(classData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Teacher Dashboard" 
        description="Manage your assigned class and verify student profiles."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-emerald-600 border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider relative z-10">Assigned Class</p>
          <p className="text-3xl font-extrabold text-white mt-2 relative z-10">
            {isLoading ? "..." : myClass ? `${myClass.grade?.name} - ${myClass.name}` : "None"}
          </p>
          <div className="mt-4 flex items-center text-emerald-100 text-xs font-medium relative z-10">
            <BookOpen size={14} className="mr-1" />
            <span>Class ID: {myClass?.id || "N/A"}</span>
          </div>
        </Card>

        <Card className="p-6 bg-white/60 backdrop-blur-md border border-white/60 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Students</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-2">--</p>
          <div className="mt-4 flex items-center text-slate-400 text-xs font-medium">
            <Users size={14} className="mr-1" />
            <span>Assigned to you</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-8 border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="text-emerald-400" />
            Class Management
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed">
            As a class teacher, you are responsible for auditing student profiles and verifying their accuracy before final submission.
          </p>
          <Link href="/teacher/students">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-900/40">
              View Student List
            </button>
          </Link>
        </Card>

        <Card className="p-8 bg-white/80 border border-white/60 shadow-sm border-dashed">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="text-blue-500" />
            Upcoming Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
               <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">12</div>
               <div>
                 <p className="font-bold text-slate-800 text-sm">Term Review Meeting</p>
                 <p className="text-slate-500 text-xs">2:30 PM • Main Hall</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
               <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">15</div>
               <div>
                 <p className="font-bold text-slate-800 text-sm">Profile Deadline</p>
                 <p className="text-slate-500 text-xs">End of week</p>
               </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
