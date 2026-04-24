"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { 
  Users, UserCheck, Settings, LogOut, 
  BookOpen, ClipboardCheck, UserCircle,
  Clock, CheckCircle2, AlertCircle, ArrowRight,
  ShieldCheck, Presentation, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import DashboardNavbar from '@/components/DashboardNavbar';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('classes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ROLE_TEACHER') {
      router.push('/login');
      return;
    }

    // Load teacher profile and stats
    api.getTeacherProfile(currentUser.username).then(profile => {
      setUser({ ...currentUser, ...profile });
      setLoading(false);
    });
    
    // Placeholder for teacher specific stats
    setStats({
      totalStudents: 42,
      pendingVerifications: 5,
      assignedClasses: 2
    });
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <DashboardNavbar />

      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
        
        {/* Welcome Header */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-black tracking-tight mb-4">Good Day, <span className="text-emerald-400">{user.name || 'Teacher'}</span></h1>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Andiambalama Maha Vidhyalaya Academic Portal. Review student records and manage your assigned cohorts.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">My Students</p>
                <p className="text-4xl font-black text-emerald-400 font-handlee">{stats.totalStudents}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Pending Tasks</p>
                <p className="text-4xl font-black text-amber-400 font-handlee">{stats.pendingVerifications}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-4 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-200 self-center mx-auto">
          {[
            { id: 'classes', label: 'My Classes', icon: Presentation },
            { id: 'verification', label: 'Student Verification', icon: ClipboardCheck },
            { id: 'profile', label: 'Personal Profile', icon: UserCircle },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-xl scale-105' 
                  : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {activeTab === 'classes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-2xl transition-all">
                 <div>
                   <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                     <Users size={32} />
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-2">Grade 10 - A</h3>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">Primary Assigned Class</p>
                   <div className="flex items-center gap-4 text-slate-500 font-medium mb-10">
                     <div className="flex items-center gap-2">
                       <GraduationCap size={18} />
                       <span>24 Students</span>
                     </div>
                     <div className="w-1 h-1 bg-slate-200 rounded-full" />
                     <span>Room 102</span>
                   </div>
                 </div>
                 <Button onClick={() => router.push('/dashboard/teacher/students')} className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                   View Student List <ArrowRight size={16} />
                 </Button>
               </div>

               <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col justify-between opacity-60 hover:opacity-100 transition-all">
                 <div>
                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
                     <Presentation size={32} />
                   </div>
                   <h3 className="text-3xl font-black text-slate-400 mb-2">Add New Class</h3>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-6">Request additional assignment</p>
                 </div>
                 <Button variant="ghost" className="w-full h-14 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
                   Contact Admin
                 </Button>
               </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <ClipboardCheck className="text-emerald-500" size={32} />
                  Pending Verifications
                </h3>
                <Button variant="ghost" onClick={() => router.push('/dashboard/teacher/students')} className="text-primary font-bold">View All Students</Button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        {i}
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-800">Student Name {i}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Index: 202400{i} | Profile Completed</p>
                      </div>
                    </div>
                    <Button className="bg-white border border-slate-200 text-slate-600 rounded-xl px-6 font-bold hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Audit Profile
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-3xl mx-auto text-center space-y-10 py-10">
              <div className="w-32 h-32 bg-primary rounded-full mx-auto flex items-center justify-center text-white shadow-2xl shadow-primary/30">
                <UserCircle size={80} />
              </div>
              <div>
                <h3 className="text-4xl font-black text-slate-900 mb-2">{user.name}</h3>
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Professional Staff Member</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Primary NIC</p>
                  <p className="text-xl font-bold text-slate-800">{user.username || user.nic}</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Designation</p>
                  <p className="text-xl font-bold text-slate-800">{user.designation || 'Class Teacher'}</p>
                </div>
              </div>
              <Button onClick={() => router.push('/dashboard/teacher/profile-setup')} className="bg-primary text-white h-16 px-12 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                Update Professional Profile
              </Button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
