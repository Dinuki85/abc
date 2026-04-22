"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Search, X, ShieldCheck, GraduationCap, School, CheckCircle2, AlertCircle, Lock, Filter, UserPlus, Eye, FileSpreadsheet, ChevronRight } from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import StudentProfileModal from '@/components/admin/StudentProfileModal';

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Detailed Profile Modal State
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Enrollment Modal State
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Filter State
  const [filterGradeId, setFilterGradeId] = useState<number | ''>('');
  const [filterClassId, setFilterClassId] = useState<number | ''>('');
  const [filterClasses, setFilterClasses] = useState<any[]>([]);

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filterGradeId, filterClassId]);

  const fetchStudents = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await api.getPaginatedStudents(page, pageSize, searchTerm, filterGradeId, filterClassId);
      setStudents(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const data = await api.getGrades();
      setGrades(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClassesForGrade = async (gradeId: number, isFilter = false) => {
    try {
      const data = await api.getClassesByGrade(gradeId);
      if (isFilter) {
        setFilterClasses(data);
      } else {
        setClasses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGradeId || !selectedClassId) return;

    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.enrollStudent({
        username,
        password,
        gradeId: selectedGradeId,
        classId: selectedClassId
      });
      setMessage({ type: 'success', text: 'Student enrolled successfully!' });
      setUsername('');
      setPassword('');
      setSelectedGradeId('');
      setSelectedClassId('');
      setShowModal(false);
      fetchStudents();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to enroll student' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveProfile = async (updatedProfile: StudentProfile) => {
    try {
      await api.saveStudentProfile(updatedProfile.username, updatedProfile);
      setMessage({ type: 'success', text: 'Student profile updated successfully!' });
      fetchStudents(currentPage);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
      throw error;
    }
  };

  const openProfile = (student: StudentProfile) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <GraduationCap size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Student Register
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Centralized enrollment management for Andiambalama Maha Vidhyalaya
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search index or name..." 
              className="pl-12 h-14 w-full lg:w-72 rounded-2xl border-gray-200 focus:ring-primary/20 focus:border-primary shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
            <select 
              value={filterGradeId} 
              onChange={(e) => {
                const gId = e.target.value === '' ? '' : parseInt(e.target.value);
                setFilterGradeId(gId);
                setFilterClassId('');
                if (gId !== '') fetchClassesForGrade(gId, true);
                else setFilterClasses([]);
              }}
              className="h-11 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-bold text-slate-600 min-w-[120px] shadow-sm appearance-none"
            >
              <option value="">All Grades</option>
              {grades.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <select 
              value={filterClassId} 
              onChange={(e) => setFilterClassId(e.target.value === '' ? '' : parseInt(e.target.value))}
              disabled={filterGradeId === ''}
              className="h-11 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs font-bold text-slate-600 min-w-[120px] disabled:opacity-50 shadow-sm appearance-none"
            >
              <option value="">All Classes</option>
              {filterClasses.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Button 
            className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 group active:scale-95 transition-all"
            onClick={() => setShowModal(true)}
          >
            <UserPlus size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            New Enrollment
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 shadow-md ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <div>
            <p className="font-bold text-sm uppercase tracking-wide">System Notification</p>
            <p className="text-sm font-medium opacity-90">{message.text}</p>
          </div>
          <button onClick={() => setMessage(null)} className="ml-auto p-2 hover:bg-black/5 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Content Table */}
      <Card className="rounded-[2.5rem] border-gray-100 shadow-xl overflow-hidden bg-white">
        <CardHeader className="px-8 py-6 flex flex-row items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-secondary rounded-full" />
            <CardTitle className="text-xl font-bold text-slate-800">Student Directory</CardTitle>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-gray-100">
               <FileSpreadsheet size={14} className="text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                 {totalElements} Records Total
               </span>
             </div>
             
             <div className="flex items-center gap-2">
               <button 
                 disabled={currentPage === 0 || isLoading}
                 onClick={() => fetchStudents(currentPage - 1)}
                 className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-200 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
               >
                 <ChevronRight size={18} className="rotate-180" />
               </button>
               <div className="bg-primary/5 px-4 h-10 rounded-xl flex items-center border border-primary/10">
                 <span className="text-xs font-black text-primary tabular-nums uppercase tracking-widest">
                   {currentPage + 1} / {totalPages || 1}
                 </span>
               </div>
               <button 
                 disabled={currentPage + 1 >= totalPages || isLoading}
                 onClick={() => fetchStudents(currentPage + 1)}
                 className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-200 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
               >
                 <ChevronRight size={18} />
               </button>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Admission No</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Grade / Class</TableHead>
                  <TableHead className="py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Verification</TableHead>
                  <TableHead className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`loading-${i}`}>
                    <TableCell colSpan={5} className="px-8 py-8 animate-pulse">
                      <div className="h-4 bg-slate-100 rounded-full w-full" />
                    </TableCell>
                  </TableRow>
                ))}

                {!isLoading && students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                          <Search size={40} />
                        </div>
                        <p className="text-slate-400 font-medium italic">No students found matching your criteria</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && students.map((st) => (
                  <TableRow key={st.id || st.username} className="hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="px-8 py-5 font-black text-primary font-mono tracking-tighter text-base">
                      {st.username}
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">
                          {st.fullName || <span className="text-slate-300 italic font-medium">Pending Completion</span>}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">
                          Account Created
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest border border-slate-200">
                          Grade {st.gradeName || 'N/A'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/10">
                          Class {st.className || 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border
                        ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          st.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-500' : 'bg-blue-500'} animate-pulse`} />
                        {st.verificationStatus || 'PENDING'}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openProfile(st)}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-90"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => openProfile(st)}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all shadow-sm active:scale-90"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm active:scale-90">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Modal - Redesigned */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto py-10 px-4">
          <div className="flex min-h-full items-center justify-center">
            <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
                    <UserPlus size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-handlee">New Student Enrollment</h3>
                    <p className="text-sm text-slate-400 font-medium tracking-tight">Generate access credentials and assign academic cell</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleEnrollment} className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Admission / Index No</label>
                    <div className="relative">
                      <Input 
                        placeholder="STU-2024-0001" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        <ShieldCheck size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Secure Passcode</label>
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="h-14 pl-12 rounded-2xl border-gray-200 bg-slate-50/50 focus:bg-white transition-all shadow-inner"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        <Lock size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Primary Academic Grade</label>
                    <select 
                      value={selectedGradeId} 
                      onChange={(e) => {
                        const gId = parseInt(e.target.value);
                        setSelectedGradeId(gId);
                        setSelectedClassId('');
                        fetchClassesForGrade(gId);
                      }} 
                      required 
                      className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                    >
                      <option value="">Choose Grade</option>
                      {grades.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Assigned Class Section</label>
                    <select 
                      value={selectedClassId} 
                      onChange={(e) => setSelectedClassId(parseInt(e.target.value))} 
                      required 
                      disabled={!selectedGradeId}
                      className="w-full h-14 bg-slate-50/50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-bold text-slate-700 shadow-inner disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                    >
                      <option value="">Choose Class</option>
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-16 rounded-3xl font-bold text-lg uppercase tracking-widest shadow-2xl shadow-primary/30 bg-primary hover:bg-primary-hover text-white active:scale-95 transition-all" 
                    isLoading={isSubmitting}
                  >
                    Authorize & Enroll Student
                  </Button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-6">
                    Verified Administrative Action &bull; Security Logged
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Detailed Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal 
          student={selectedStudent}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}

function ChevronRight(props: any) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

