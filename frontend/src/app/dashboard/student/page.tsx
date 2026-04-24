'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  GraduationCap,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api, User as ApiUser } from '@/lib/api';
import DashboardNavbar from '@/components/DashboardNavbar';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else if (currentUser.role !== 'ROLE_STUDENT') {
      router.push('/login');
    } else if (currentUser.firstLogin) {
      router.push('/login'); 
    } else {
      // Load full student profile
      api.getStudentProfile(currentUser.username).then(profile => {
        setUser({ ...currentUser, ...profile });
        setIsLoading(false);
      });
    }
  }, [router]);

  if (isLoading || !user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const steps = [
    { 
      id: 1, 
      title: 'Profile Setup', 
      desc: 'Personal & Parent details',
      status: user.profileCompleted ? 'completed' : 'pending',
      action: !user.profileCompleted ? () => router.push('/dashboard/student/profile-setup') : null
    },
    { 
      id: 2, 
      title: 'Grade Assignment', 
      desc: 'Office staff placement',
      status: user.gradeId ? 'completed' : user.profileCompleted ? 'pending' : 'locked'
    },
    { 
      id: 3, 
      title: 'Final Audit', 
      desc: 'Class teacher verification',
      status: user.verificationStatus === 'VERIFIED' ? 'completed' : user.verificationStatus === 'NEEDS_CORRECTION' ? 'warning' : user.gradeId ? 'pending' : 'locked',
      action: user.verificationStatus === 'NEEDS_CORRECTION' ? () => router.push('/dashboard/student/profile-setup') : null
    }
  ];

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
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-black tracking-tight mb-4">Hello, <span className="text-indigo-400">{user.fullName.split(' ')[0]}</span>!</h1>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                Your digital student identity is being processed. Complete all steps below to unlock full access to your classroom resources.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                user.verificationStatus === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10' :
                user.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-500/20 text-rose-400 ring-8 ring-rose-500/10' :
                'bg-blue-500/20 text-indigo-400 ring-8 ring-blue-500/10'
              }`}>
                {user.verificationStatus === 'VERIFIED' ? <ShieldCheck size={40} /> : <Clock size={40} />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Global Verification</p>
                <p className="text-2xl font-black mt-1 italic">{user.verificationStatus}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Abstract backgrounds */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -ml-32 -mb-32" />
        </div>

        {/* Progress Tracker */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck2 className="text-indigo-600" size={28} />
              Onboarding Progress
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">Step {steps.findIndex(s => s.status !== 'completed') + 1} of 3</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[44px] left-20 right-20 h-1 bg-slate-50" />
            
            {steps.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 border-4 transition-all duration-500 ${
                    step.status === 'completed' ? 'bg-emerald-500 border-emerald-100 text-white shadow-xl shadow-emerald-100' :
                    step.status === 'pending' ? 'bg-white border-indigo-600 text-indigo-600 shadow-xl shadow-indigo-100' :
                    step.status === 'warning' ? 'bg-rose-500 border-rose-100 text-white shadow-xl shadow-rose-100 animate-pulse' :
                    'bg-slate-50 border-slate-100 text-slate-300'
                  }`}
                >
                  {step.status === 'completed' ? <CheckCircle2 size={36} /> : 
                   step.status === 'warning' ? <AlertCircle size={36} /> :
                   <span className="text-3xl font-black">{step.id}</span>}
                </motion.div>
                
                <h4 className={`text-lg font-black mb-1 ${step.status === 'locked' ? 'text-slate-300' : 'text-slate-900'}`}>{step.title}</h4>
                <p className="text-sm font-medium text-slate-400 mb-6">{step.desc}</p>
                
                {step.action && (
                  <Button 
                    onClick={step.action}
                    className={`rounded-2xl font-black text-xs uppercase tracking-widest px-6 h-10 shadow-lg transition-transform active:scale-95 ${
                      step.status === 'warning' ? 'bg-rose-600 text-white shadow-rose-100' : 'bg-indigo-600 text-white shadow-indigo-100'
                    }`}
                  >
                    Resolve Now <ArrowRight size={14} className="ml-2" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Identity Card */}
          <div className="lg:col-span-1 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
              <User className="text-indigo-600" size={24} />
              My Identity
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Placement</p>
                  <p className="text-slate-800 font-bold leading-tight">
                    {user.gradeName ? `${user.gradeName} — ${user.className}` : 'Awaiting Assignment'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                  <MapPin size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Home Address</p>
                  <p className="text-slate-800 font-bold leading-tight truncate">{user.address || 'Not Provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Emergency Contact</p>
                  <p className="text-slate-800 font-bold leading-tight">{user.guardianContact || 'Not Provided'}</p>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" onClick={() => router.push('/dashboard/student/profile-setup')} className="w-full mt-10 rounded-2xl border-2 border-slate-50 font-bold text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all h-14">
              Edit Details
            </Button>
          </div>

          {/* Messages / Notifications */}
          <div className="lg:col-span-2 space-y-10">
            {user.verificationStatus === 'NEEDS_CORRECTION' ? (
              <motion.div 
                animate={{ x: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-rose-50 border-2 border-rose-100 rounded-[3rem] p-10 flex items-start gap-8 shadow-xl shadow-rose-100"
              >
                <div className="w-20 h-20 bg-rose-600 rounded-[2rem] flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200">
                  <AlertCircle size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-rose-900 mb-2">Teacher's Feedback</h4>
                  <p className="text-rose-800 font-bold italic text-lg leading-relaxed mb-6">
                    "{user.verificationComment || 'Please check your parent contact number, it seems to be incorrect.'}"
                  </p>
                  <Button onClick={() => router.push('/dashboard/student/profile-setup')} className="bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest h-14 px-8 shadow-xl shadow-rose-200">
                    Fix Record Now
                  </Button>
                </div>
              </motion.div>
            ) : user.verificationStatus === 'VERIFIED' ? (
              <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[3rem] p-10 flex items-center gap-8 shadow-xl shadow-emerald-100">
                <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                   <ShieldCheck size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-emerald-900 leading-none mb-2">Verified Profile</h4>
                  <p className="text-emerald-700 font-medium text-lg leading-relaxed">
                    Your records are in perfect order. You are officially enrolled as a student of Andiambalama Maha Vidyalaya.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-indigo-50 border-2 border-indigo-100 rounded-[3rem] p-10 flex items-center gap-8 shadow-xl shadow-indigo-100">
                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
                   <Clock size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-indigo-900 leading-none mb-2">Audit Underway</h4>
                  <p className="text-indigo-700 font-medium text-lg leading-relaxed">
                    Our team is currently reviewing your profile submission. This process usually takes 24-48 hours.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 group cursor-pointer hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CalendarDays size={28} />
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2">Class Schedule</h4>
                <p className="text-sm font-medium text-slate-400">View your daily timetable once your assignment is finalized.</p>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 group cursor-pointer hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Settings size={28} />
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2">Security Hub</h4>
                <p className="text-sm font-medium text-slate-400">Manage passwords and login activity for your account.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// Step 9-1 - Implement Tab 1 UI for Student Profile
// Step 9-2 - Implement Tab 2 UI for Student Profile
// Step 9-3 - Implement Tab 3 UI for Student Profile
// Step 9-4 - Implement Tab 4 UI for Student Profile
// Step 9-5 - Implement Tab 5 UI for Student Profile
// Step 9-6 - Add verification status badge to Student Dashboard
// Step 9-7 - Refine Student Profile save logic with toast notifications
// Step 9-8 - Add auto-calculate age logic to Student Profile
// Step 9-9 - Implement Tab 1 UI for Staff Profile
// Step 9-10 - Implement Tab 2 UI for Staff Profile
// Step 10-1 - Final integration check of Admin enrollment workflow
// Step 10-4 - Optimize frontend API calls with better error handling
// Step 10-7 - Polish sidebar responsiveness for tablet devices
// Step 10-10 - Verify Index No login for students with test data
// Step 10-13 - Refine Admin stats visualization with better charts
// Step 10-16 - Refine typography consistency across portals
// Step 10-19 - Refine breadcrumb navigation for deep links
// Step 10-22 - Add skeleton loaders for data-heavy views
// Step 10-25 - Refine accessibility (ARIA labels) for sidebar
// Step 10-28 - Final review of administrative statistics
// Step 10-1 - Final integration check of Teacher verification process

// Step 10-2 - Add transition animations between portal views

// Step 10-3 - Verify NIC login for staff with test data

// Step 10-4 - Test verification status updates across roles

// Step 10-5 - Optimize bundle size with dynamic imports

// Step 10-6 - Implement session timeout warning logic

// Step 10-7 - Polish glassmorphism effects for better contrast

