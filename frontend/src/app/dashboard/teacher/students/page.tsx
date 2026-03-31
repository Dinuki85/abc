'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  ShieldAlert,
  MessageSquare,
  History,
  LogOut,
  ChevronRight,
  ClipboardCheck,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockApi, MockStudent } from '@/lib/mock-api';

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState<MockStudent | null>(null);
  const [pendingStudents, setPendingStudents] = useState<MockStudent[]>([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [staff, setStaff] = useState<MockStudent | null>(null);

  useEffect(() => {
    const currentUser = mockApi.getCurrentUser();
    if (!currentUser || currentUser.role !== 'TEACHER') {
      router.push('/login');
    } else {
      setStaff(currentUser);
      refreshPendingQueue();
    }
  }, [router]);

  const refreshPendingQueue = () => {
    setPendingStudents(mockApi.getPendingVerificationStudents());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const found = mockApi.searchStudent(searchQuery);
    if (found) {
      setStudent(found);
    } else {
      setError('No student found with that index number.');
    }
  };

  const handleVerify = (status: MockStudent['verificationStatus']) => {
    if (!student) return;
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const result = mockApi.verifyStudent(student.username, status, comment);
        if (result) {
          setSuccess(`Student marked as ${status} successfully.`);
          // Refresh local student state
          setStudent({ ...student, verificationStatus: status, verificationComment: comment });
          setComment('');
          refreshPendingQueue();
          setTimeout(() => setSuccess(''), 5000);
        } else {
          setError('Failed to update verification status.');
        }
      } catch (err) {
        setError('An error occurred.');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  if (!staff) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 rotate-3 group hover:rotate-0 transition-transform cursor-pointer">
            <ShieldCheck size={28} />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">Verification Portal</span>
            <span className="text-[10px] text-indigo-600 font-black uppercase tracking-widest leading-none">Class Records Office</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end border-r border-slate-100 pr-6">
            <span className="text-sm font-black text-slate-900 leading-none">{staff.fullName}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Authorized Teacher</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { mockApi.logout(); router.push('/login'); }} 
            className="rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all font-bold px-4"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      <main className="flex-grow p-6 md:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Search & Verification (8 Cols) */}
        <div className="xl:col-span-8 space-y-10">
          <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="flex-grow space-y-3 relative z-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Audit Student Data</h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xl">Search any student by index number to review their private details and authorize their placement.</p>
            </div>
            <form onSubmit={handleSearch} className="w-full md:w-auto min-w-[350px] relative z-10">
              <div className="relative">
                <Input 
                  placeholder="e.g. STU2024001" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-16 text-xl font-bold border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-600/10 focus:border-indigo-600 transition-all shadow-sm"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 w-6 h-6" />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100">
                  Search
                </Button>
              </div>
            </form>
          </section>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-3xl flex items-center gap-3"
              >
                <AlertCircle size={24} className="shrink-0" />
                <p className="font-black italic">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-3xl flex items-center gap-3"
              >
                <CheckCircle2 size={24} className="shrink-0" />
                <p className="font-black italic">{success}</p>
              </motion.div>
            )}

            {student ? (
              <motion.div 
                key={student.username}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              >
                {/* Profile Details */}
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                  <div className="flex items-center gap-8 mb-12">
                    <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200">
                      {student.fullName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">{student.fullName}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-indigo-600 font-black tracking-widest uppercase text-xs">{student.username}</span>
                        <div className="h-1 w-1 bg-slate-300 rounded-full" />
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                          {mockApi.getGradeName(student.gradeId)} — {mockApi.getClassName(student.classId)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { icon: MapPin, label: 'Permanent Address', value: student.profileData?.address },
                      { icon: User, label: 'Parent / Guardian', value: student.profileData?.parentName },
                      { icon: Phone, label: 'Contact Number', value: student.profileData?.parentContact }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white rounded-2xl text-slate-400 group-hover:text-indigo-600 group-hover:shadow-sm transition-colors">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                            <p className="text-slate-800 font-bold leading-tight">{item.value || 'Not Disclosed'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Onboarding Status</p>
                      <div className="flex items-center gap-2">
                        {student.profileCompleted ? (
                          <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black">PROFILE COMPLETE</span>
                        ) : (
                          <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-black">PROFILE INCOMPLETE</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verification</p>
                      <p className={`text-xl font-black ${
                        student.verificationStatus === 'VERIFIED' ? 'text-emerald-500' : 
                        student.verificationStatus === 'NEEDS_CORRECTION' ? 'text-rose-500' : 'text-blue-500'
                      }`}>
                        {student.verificationStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Sidebar */}
                <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <MessageSquare size={24} className="text-indigo-400" />
                      Auditor's Decision
                    </h3>

                    {!student.profileCompleted ? (
                      <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
                        <p className="text-slate-400 font-medium text-sm leading-relaxed italic">
                          This student record is currently locked. Action can only be taken once the student completes their digital profile layout.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Feedback / Notes</label>
                          <textarea 
                            className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] h-40 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm placeholder:text-slate-600"
                            placeholder="Type specific correction instructions if rejecting, or internal audit notes if approving..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col gap-4">
                          <Button 
                            onClick={() => handleVerify('VERIFIED')}
                            className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
                            isLoading={isLoading}
                          >
                            <ShieldCheck className="mr-3" size={24} />
                            AUTHORIZE DATA
                          </Button>
                          <Button 
                            variant="ghost"
                            onClick={() => handleVerify('NEEDS_CORRECTION')}
                            className="w-full h-16 text-rose-400 border border-rose-400/20 hover:bg-rose-500/10 font-bold rounded-2xl active:scale-95 transition-all"
                            isLoading={isLoading}
                          >
                            <ShieldAlert className="mr-3" size={24} />
                            REQUEST CORRECTION
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex items-center justify-between hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        <History size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800">Record History</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">View full audit trail</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[600px] bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-100">
                  <Search size={64} />
                </div>
                <h3 className="text-3xl font-black text-slate-200 italic">Select a Record to Audit</h3>
                <p className="text-slate-400 font-medium mt-4 max-w-sm">Use the global search or select a student from the pending queue on the right to begin verification.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Pending Queue (4 Cols) */}
        <div className="xl:col-span-4 space-y-8">
          <section className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 h-full max-h-[1000px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <ClipboardCheck className="text-indigo-600" size={24} />
                Pending Queue
              </h3>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black tracking-widest">{pendingStudents.length} TOTAL</span>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {pendingStudents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800">No Pending Audits</h4>
                    <p className="text-xs text-slate-400 mt-1">All assigned students have been verified for today.</p>
                  </div>
                </div>
              ) : (
                pendingStudents.map((stu) => (
                  <motion.div 
                    layout
                    key={stu.username}
                    onClick={() => {
                      setStudent(stu);
                      setComment('');
                      setSuccess('');
                      setError('');
                    }}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer group ${
                      student?.username === stu.username 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200' 
                      : 'bg-slate-50 border-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${
                        student?.username === stu.username ? 'bg-white text-indigo-600' : 'bg-white text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}>
                        {stu.fullName.charAt(0)}
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <h4 className="font-black text-sm truncate">{stu.fullName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className={`text-[10px] font-black uppercase tracking-widest truncate ${
                            student?.username === stu.username ? 'text-indigo-200' : 'text-slate-400'
                          }`}>{stu.username}</p>
                          <div className={`h-3 w-px ${student?.username === stu.username ? 'bg-indigo-400' : 'bg-slate-200'}`} />
                          <p className={`text-[10px] font-bold ${
                            student?.username === stu.username ? 'text-indigo-200' : 'text-slate-500'
                          }`}>
                            {mockApi.getGradeName(stu.gradeId)}–{mockApi.getClassName(stu.classId)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={18} className={student?.username === stu.username ? 'text-white' : 'text-slate-300 group-hover:translate-x-1 transition-transform'} />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-50">
              <div className="p-6 bg-indigo-50 rounded-3xl flex items-center gap-4">
                <Users className="text-indigo-600 shrink-0" size={32} />
                <div>
                  <h5 className="font-black text-indigo-900 text-sm">Reviewing Guidelines</h5>
                  <p className="text-[10px] text-indigo-600/70 font-bold leading-tight mt-1">
                    Ensure all parent contact details are formatted correctly before authorization.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
