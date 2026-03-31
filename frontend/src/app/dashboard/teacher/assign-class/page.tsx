'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Search, 
  UserPlus, 
  School, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  LogOut,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { mockApi, MockStudent, Grade, Class } from '@/lib/mock-api';

export default function AssignClassPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState<MockStudent | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [selectedClassId, setSelectedClassId] = useState<string>('');
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
      setGrades(mockApi.getGrades());
    }
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setStudent(null);
    setSelectedGradeId('');
    setSelectedClassId('');
    
    const found = mockApi.searchStudent(searchQuery);
    if (found) {
      if (found.verificationStatus !== 'VERIFIED') {
        setError('This student is not yet VERIFIED. Only verified students can be assigned to classes.');
      } else {
        setStudent(found);
        if (found.gradeId) setSelectedGradeId(found.gradeId.toString());
        if (found.classId) setSelectedClassId(found.classId.toString());
      }
    } else {
      setError('No student found with that index number.');
    }
  };

  const onGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    setSelectedClassId('');
    if (gradeId) {
      setAvailableClasses(mockApi.getClassesByGrade(parseInt(gradeId)));
    } else {
      setAvailableClasses([]);
    }
  };

  const handleAssign = async () => {
    if (!student || !selectedGradeId || !selectedClassId) return;
    setIsLoading(true);
    
    try {
      const result = mockApi.assignClass(
        student.username, 
        parseInt(selectedGradeId), 
        parseInt(selectedClassId)
      );
      if (result) {
        setSuccess(`Student ${student.fullName} has been assigned to ${mockApi.getGradeName(parseInt(selectedGradeId))} - ${mockApi.getClassName(parseInt(selectedClassId))}.`);
        setStudent({ 
          ...student, 
          gradeId: parseInt(selectedGradeId), 
          classId: parseInt(selectedClassId) 
        });
      } else {
        setError('Failed to assign class.');
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
            <UserPlus size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Class Management Portal</span>
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
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Assign Student to Class</h1>
              <p className="text-slate-500 font-medium leading-relaxed">Search for a verified student to assign their primary Grade and Class.</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 slide-in-from-bottom-8 animate-in duration-500">
            {/* Student Mini Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 sticky top-28">
                 <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-xl">
                      {student.fullName.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{student.fullName}</h2>
                    <p className="text-indigo-600 font-bold">{student.username}</p>
                    <div className="mt-6 w-full space-y-3">
                       <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <span className="text-xs font-bold text-emerald-700 uppercase">Verification</span>
                          <ShieldCheck size={16} className="text-emerald-600" />
                       </div>
                       {student.gradeId && (
                         <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase">Currently In</span>
                            <span className="text-sm font-bold text-slate-800">{mockApi.getGradeName(student.gradeId)} - {mockApi.getClassName(student.classId)}</span>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            </div>

            {/* Assignment Controls */}
            <div className="lg:col-span-2">
               <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <School className="text-indigo-600 w-8 h-8" />
                    Place Student in Class
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700 ml-1">1. Select Grade</label>
                        <div className="grid grid-cols-1 gap-2">
                           {grades.map((grade) => (
                             <button
                               key={grade.id}
                               onClick={() => onGradeChange(grade.id.toString())}
                               className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                                 selectedGradeId === grade.id.toString()
                                 ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50'
                                 : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600'
                               }`}
                             >
                               <div className="flex items-center gap-3">
                                  <GraduationCap size={20} className={selectedGradeId === grade.id.toString() ? 'text-indigo-600' : 'text-slate-400'} />
                                  <span className="font-bold">{grade.name}</span>
                               </div>
                               {selectedGradeId === grade.id.toString() && <ChevronRight size={20} />}
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700 ml-1">2. Select Class</label>
                        {!selectedGradeId ? (
                          <div className="h-full min-h-[150px] border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 font-medium p-6 text-center">
                            Please select a grade first to see available classes.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-2">
                             {availableClasses.map((cls) => (
                               <button
                                 key={cls.id}
                                 onClick={() => setSelectedClassId(cls.id.toString())}
                                 className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                                   selectedClassId === cls.id.toString()
                                   ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-50'
                                   : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600'
                                 }`}
                               >
                                 <span className="font-bold">Class {cls.name}</span>
                                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                   selectedClassId === cls.id.toString() ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200'
                                 }`}>
                                    {selectedClassId === cls.id.toString() && <div className="w-2 h-2 bg-white rounded-full" />}
                                 </div>
                               </button>
                             ))}
                          </div>
                        )}
                     </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      onClick={handleAssign}
                      disabled={!selectedClassId || isLoading}
                      className="w-full h-16 text-xl font-bold rounded-2xl shadow-indigo-100 shadow-2xl uppercase tracking-widest gap-2"
                      isLoading={isLoading}
                    >
                      Complete Assignment
                      <ArrowRight size={24} />
                    </Button>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-[400px] bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-10">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                <Search size={48} />
             </div>
             <h3 className="text-2xl font-bold text-slate-300">Search for a Verified Student</h3>
             <p className="text-slate-400 font-medium mt-2 max-w-sm">Use the search box above. Only students with a fully verified profile can be assigned to a class.</p>
          </div>
        )}
      </main>
    </div>
  );
}
