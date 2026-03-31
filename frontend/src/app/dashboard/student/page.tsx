'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText,
  UserCheck2,
  CalendarDays,
  GraduationCap
} from 'lucide-react';
import { mockApi, MockStudent } from '@/lib/mock-api';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<MockStudent | null>(null);

  useEffect(() => {
    const currentUser = mockApi.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else if (!currentUser.profileCompleted || currentUser.isFirstLogin) {
      router.push('/login'); // Redirection logic will handle it
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    mockApi.logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg rotate-3 group hover:rotate-0 transition-transform">
            <span className="text-xl font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Student Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-sm font-bold text-slate-900 leading-none">{user.fullName}</span>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{user.username}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-xl border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold font-handlee mb-4 tracking-tight">Welcome Back, {user.fullName.split(' ')[0]}!</h1>
            <p className="text-white/80 max-w-2xl text-lg leading-relaxed">
              Manage your academic profile, view school updates, and track your data verification status all in one place.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 shrink-0" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -ml-10 -mb-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Overview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
               <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <UserCheck2 className="text-primary w-6 h-6" />
                  Verification Status
                </h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className={`p-6 rounded-3xl border-2 transition-all cursor-default ${
                   user.verificationStatus === 'VERIFIED' 
                   ? 'border-emerald-100 bg-emerald-50/50' 
                   : user.verificationStatus === 'NEEDS_CORRECTION' 
                   ? 'border-rose-100 bg-rose-50/50' 
                   : 'border-blue-100 bg-blue-50/50'
                 }`}>
                   <div className="flex flex-col items-center text-center space-y-3">
                      {user.verificationStatus === 'VERIFIED' ? (
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      ) : user.verificationStatus === 'NEEDS_CORRECTION' ? (
                        <AlertCircle className="w-10 h-10 text-rose-500" />
                      ) : (
                        <Clock className="w-10 h-10 text-blue-500" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">State</p>
                        <p className={`text-xl font-bold ${
                          user.verificationStatus === 'VERIFIED' ? 'text-emerald-600' : 
                          user.verificationStatus === 'NEEDS_CORRECTION' ? 'text-rose-600' : 'text-blue-600'
                        }`}>
                          {user.verificationStatus}
                        </p>
                      </div>
                   </div>
                 </div>

                 <div className="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <FileText className="w-10 h-10 text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Profile</p>
                        <p className="text-xl font-bold text-slate-700">Completed</p>
                      </div>
                    </div>
                 </div>

                 <div className="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <GraduationCap className="w-10 h-10 text-primary" />
                      <div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Grade & Class</p>
                        <p className="text-xl font-bold text-slate-700">
                          {user.gradeId ? `${mockApi.getGradeName(user.gradeId)} - ${mockApi.getClassName(user.classId)}` : 'Not Assigned'}
                        </p>
                      </div>
                    </div>
                 </div>

                 <div className="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 lg:col-span-3">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <CalendarDays className="w-10 h-10 text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Academic Year</p>
                        <p className="text-xl font-bold text-slate-700">2024 / 2025</p>
                      </div>
                    </div>
                 </div>
               </div>

               {user.verificationStatus === 'NEEDS_CORRECTION' && (
                 <div className="mt-8 bg-rose-50 border border-rose-200 p-6 rounded-3xl animate-pulse">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-rose-800 font-bold text-lg">Action Required!</h4>
                        <p className="text-rose-700 font-medium mb-4">{user.verificationComment || 'Your profile needs updates before final verification.'}</p>
                        <Button onClick={() => router.push('/dashboard/student/profile-setup')} className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold">
                          Update My Profile
                        </Button>
                      </div>
                    </div>
                 </div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 group hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-blue-50/50 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">My Information</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">Review your personal and parent contact details submitted for school records.</p>
               </div>

               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 group hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-indigo-50/50 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Settings size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Security Settings</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">Update your password frequently to keep your student account secure.</p>
               </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <CalendarDays className="text-primary w-5 h-5" />
                 Upcoming Events
               </h3>
               <div className="space-y-6">
                 {[
                   { date: 'APR 15', title: 'Mid-term Exams', type: 'Academic' },
                   { date: 'APR 22', title: 'New Year Festival', type: 'Event' },
                   { date: 'MAY 05', title: 'Sports Meet 2024', type: 'Sports' }
                 ].map((event, i) => (
                   <div key={i} className="flex items-center gap-4 group">
                     <div className="w-14 h-14 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                       <span className="text-[10px] uppercase leading-tight">{event.date.split(' ')[0]}</span>
                       <span className="text-lg leading-tight">{event.date.split(' ')[1]}</span>
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                       <p className="text-xs text-slate-500 font-medium">{event.type}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <Button variant="ghost" className="w-full mt-8 text-primary font-bold hover:bg-primary/5 rounded-xl">View Calendar</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
