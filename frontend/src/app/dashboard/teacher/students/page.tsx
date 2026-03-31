'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
  ChevronRight
} from 'lucide-react';
import { mockApi, MockStudent } from '@/lib/mock-api';

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState<MockStudent | null>(null);
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
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setStudent(null);
    
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
    
    try {
      const result = mockApi.verifyStudent(student.username, status, comment);
      if (result) {
        setSuccess(`Student marked as ${status} successfully.`);
        // Refresh local student state
        setStudent({ ...student, verificationStatus: status, verificationComment: comment });
        setComment('');
      } else {
        setError('Failed to update verification status.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!staff) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Staff Header */}
       <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Staff Verification Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2 text-right">
            <span className="text-sm font-bold text-slate-900 leading-none">{staff.fullName}</span>
            <span className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">Teacher Incharge</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => { mockApi.logout(); router.push('/login'); }} className="rounded-xl border-slate-200">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <main className="flex-grow p-6 md:p-8 max-w-5xl mx-auto w-full">
        {/* Search Section */}
        <section className="mb-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-grow space-y-2">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Verify Student Data</h1>
              <p className="text-slate-500 font-medium leading-relaxed">Enter a student's Index Number to search and verify their information.</p>
            </div>
            <form onSubmit={handleSearch} className="w-full md:w-1/3 min-w-[300px]">
              <div className="relative">
                <Input 
                  placeholder="e.g. STU2024001" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg font-bold border-indigo-100 bg-indigo-50/10 focus:ring-indigo-600/20 focus:border-indigo-600"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 w-6 h-6" />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl">Search</Button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Area */}
        {error && (
          <div className="mb-8 bg-rose-50 border border-rose-100 text-rose-600 px-6 py-4 rounded-3xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="h-6 w-6 shrink-0" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-8 bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-3xl flex items-center gap-3 slide-in-from-top-4 animate-in duration-500">
            <CheckCircle2 className="h-6 w-6 shrink-0" />
            <p className="font-bold">{success}</p>
          </div>
        )}

        {student ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 slide-in-from-bottom-8 animate-in duration-500">
            {/* Student Info Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full -mr-10 -mt-10" />
               
               <div className="flex items-center gap-6 mb-10 relative z-10">
                 <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-indigo-200 shadow-xl">
                   {student.fullName.charAt(0)}
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-slate-800 leading-tight">{student.fullName}</h2>
                   <p className="text-indigo-600 font-bold uppercase tracking-wider text-sm">{student.username}</p>
                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 mt-2">{student.grade}</span>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                    <MapPin className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Permanent Address</p>
                      <p className="text-slate-700 font-bold leading-tight">{student.profileData?.address || 'Not Provided'}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                    <User className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Parent Name</p>
                      <p className="text-slate-700 font-bold leading-tight">{student.profileData?.parentName || 'Not Provided'}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                    <Phone className="text-slate-400 mt-1" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Contact Number</p>
                      <p className="text-slate-700 font-bold leading-tight">{student.profileData?.parentContact || 'Not Provided'}</p>
                    </div>
                 </div>
               </div>

               <div className="mt-10 p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile Status</p>
                    <p className="text-lg font-bold">{student.profileCompleted ? 'COMPLETED' : 'PENDING'}</p>
                  </div>
                  <ChevronRight className="text-slate-600" />
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification Status</p>
                    <p className={`text-lg font-bold ${
                      student.verificationStatus === 'VERIFIED' ? 'text-emerald-400' : 
                      student.verificationStatus === 'NEEDS_CORRECTION' ? 'text-rose-400' : 'text-blue-400'
                    }`}>
                      {student.verificationStatus}
                    </p>
                  </div>
               </div>
            </div>

            {/* Verification Actions Sidebar */}
            <div className="space-y-8">
               <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <MessageSquare className="text-indigo-600 w-6 h-6" />
                    Verification Actions
                  </h3>

                  {!student.profileCompleted ? (
                    <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl">
                       <p className="text-amber-800 font-medium text-sm leading-relaxed">
                         This student has not completed their profile yet. Verification is disabled until they submit their details.
                       </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Staff Comments (Optional)</label>
                        <textarea 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
                          placeholder="Provide specific instructions for correction if needed..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <Button 
                          onClick={() => handleVerify('VERIFIED')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white h-14 font-bold text-lg rounded-2xl shadow-emerald-100 shadow-xl"
                          isLoading={isLoading}
                        >
                          <ShieldCheck className="mr-2" />
                          Mark as VERIFIED
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleVerify('NEEDS_CORRECTION')}
                          className="border-rose-200 text-rose-600 hover:bg-rose-50 h-14 font-bold text-lg rounded-2xl"
                          isLoading={isLoading}
                        >
                          <ShieldAlert className="mr-2" />
                          Request CORRECTION
                        </Button>
                      </div>
                    </div>
                  )}
               </div>

               <div className="bg-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                      <History size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-white transition-colors">Audit History</h4>
                      <p className="text-xs text-slate-500 font-medium">View recent updates to this student</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-white" />
               </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-10">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                <Search size={48} />
             </div>
             <h3 className="text-2xl font-bold text-slate-300">Awaiting Search</h3>
             <p className="text-slate-400 font-medium mt-2 max-w-sm">Use the search box above to find a student by their Index Number and begin the verification process.</p>
          </div>
        )}
      </main>
    </div>
  );
}
