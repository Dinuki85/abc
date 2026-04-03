"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Plus, Edit2, Trash2, Search, X, ShieldCheck, GraduationCap, School, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Input } from '@/components/ui/Input';

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Trigger fetch when filters or page change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(0); // Reset to page 0 when filters change
    }, 500); // 500ms debounce for search
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

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGradeId === '' || s.gradeId === filterGradeId;
    const matchesClass = filterClassId === '' || s.classId === filterClassId;

    return matchesSearch && matchesGrade && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Student Register
          </h1>
          <p className="text-slate-500 mt-1">
            Search, filter, and manage student enrollments
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search index or name..." 
              className="pl-10 h-11 w-48 lg:w-64 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            value={filterGradeId} 
            onChange={(e) => {
              const gId = e.target.value === '' ? '' : parseInt(e.target.value);
              setFilterGradeId(gId);
              setFilterClassId('');
              if (gId !== '') fetchClassesForGrade(gId, true);
              else setFilterClasses([]);
            }}
            className="h-11 px-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-600 min-w-[120px]"
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
            className="h-11 px-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium text-slate-600 min-w-[120px] disabled:opacity-50"
          >
            <option value="">All Classes</option>
            {filterClasses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <Button className="shrink-0 group" onClick={() => setShowModal(true)}>
            <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
            Enroll Student
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
          <CardTitle>Active Enrollments</CardTitle>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className="bg-slate-100 px-3 py-1 rounded-full">
              Showing {students.length} of {totalElements} Records
            </span>
            <div className="flex items-center gap-2">
               <button 
                 disabled={currentPage === 0 || isLoading}
                 onClick={() => fetchStudents(currentPage - 1)}
                 className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-30 transition-colors"
               >
                  &larr; Prev
               </button>
               <span className="text-indigo-600 font-black">Page {currentPage + 1} of {totalPages}</span>
               <button 
                 disabled={currentPage + 1 >= totalPages || isLoading}
                 onClick={() => fetchStudents(currentPage + 1)}
                 className="p-1 rounded-md hover:bg-slate-100 disabled:opacity-30 transition-colors"
               >
                  Next &rarr;
               </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index (Username)</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Audit Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading State */}
              {isLoading && Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`loading-${i}`}>
                   <TableCell colSpan={7} className="h-16 animate-pulse bg-slate-50/50">&nbsp;</TableCell>
                </TableRow>
              ))}

              {/* Empty State */}
              {!isLoading && filteredStudents.length === 0 && (
                <TableRow key="empty">
                  <TableCell colSpan={7} className="text-center py-20 text-slate-400 italic font-medium">No students found matching your criteria.</TableCell>
                </TableRow>
              )}

              {/* Data State */}
              {!isLoading && students.map((st) => (
                <TableRow key={st.id || st.username} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-bold text-indigo-600">{st.username}</TableCell>
                  <TableCell className="font-medium">{st.fullName || <span className="text-slate-300 italic">Not Completed</span>}</TableCell>
                  <TableCell>
                     <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-widest border border-slate-200/50">
                        {st.gradeName || 'Unassigned'}
                     </span>
                  </TableCell>
                  <TableCell>
                     <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100/50">
                        {st.className || 'N/A'}
                     </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${st.verificationStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                        st.verificationStatus === 'NEEDS_CORRECTION' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {st.verificationStatus || 'PENDING'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <GraduationCap size={20} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">Enroll New Student</h3>
                    <p className="text-xs text-slate-500 font-medium tracking-tight">Create account and assign class</p>
                 </div>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEnrollment} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student Username / Index</label>
                <div className="relative">
                  <Input 
                    placeholder="e.g. STU2024001" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="h-12 pl-10 rounded-2xl"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                     <ShieldCheck size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporary Password</label>
                <div className="relative">
                  <Input 
                    type="password"
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="h-12 pl-10 rounded-2xl"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                     <Lock size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assigned Grade</label>
                  <select 
                    value={selectedGradeId} 
                    onChange={(e) => {
                       const gId = parseInt(e.target.value);
                       setSelectedGradeId(gId);
                       setSelectedClassId('');
                       fetchClassesForGrade(gId);
                    }} 
                    required 
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
                  >
                    <option value="">Select Grade</option>
                    {grades.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assigned Class</label>
                   <select 
                     value={selectedClassId} 
                     onChange={(e) => setSelectedClassId(parseInt(e.target.value))} 
                     required 
                     disabled={!selectedGradeId}
                     className="w-full h-12 bg-slate-50 border border-slate-200 rounded-2xl px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold text-slate-700 disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
                   >
                     <option value="">Select Class</option>
                     {classes.map(c => (
                       <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                   </select>
                </div>
              </div>

              <div className="pt-4">
                 <Button type="submit" className="w-full h-14 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl shadow-indigo-500/30" isLoading={isSubmitting}>
                    Finalize Enrollment
                 </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
