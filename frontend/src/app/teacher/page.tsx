'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  Users, 
  Search,
  LayoutGrid,
  ChevronDown,
  User as UserIcon,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function TeacherDashboard() {
  const [myGrade, setMyGrade] = useState<any>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // View States
  const [activeStudent, setActiveStudent] = useState<StudentProfile | null>(null);
  
  // Verification states
  const [auditComment, setAuditComment] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // If we have an active student but the user changes the search or class filter, 
    // we want to clear the active student to show the list/empty state again
    // UNLESS the search specifically found this student
    
    if (searchQuery.trim() === '') {
       if (activeStudent && activeStudent.username !== searchQuery) {
           setActiveStudent(null);
       }
    } else {
        const exactMatch = students.find(s => 
          s.username.toLowerCase() === searchQuery.trim().toLowerCase() ||
          (s.username.toLowerCase().includes(searchQuery.trim().toLowerCase()) && searchQuery.length >= 4)
        );
        if (exactMatch) {
          setActiveStudent(exactMatch);
        } else {
          setActiveStudent(null);
        }
    }
  }, [searchQuery, selectedClassId, students]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const gradeData = await api.getMyGrade();
      setMyGrade(gradeData);
      
      if (gradeData && gradeData.id) {
        const [studentData, classesData] = await Promise.all([
          api.getStudentsByGrade(gradeData.id),
          api.getTeacherClassesByGrade(gradeData.id)
        ]);
        setStudents(studentData);
        setClasses(classesData);
        
        // Refresh active student if open
        if (activeStudent) {
            const updated = studentData.find((s: StudentProfile) => s.id === activeStudent.id);
            if (updated) setActiveStudent(updated);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (status: 'VERIFIED' | 'NEEDS_CORRECTION') => {
    if (!activeStudent || !activeStudent.id) return;
    setIsVerifying(true);
    try {
      await api.verifyStudent(activeStudent.id, status, auditComment);
      setAuditComment('');
      fetchData(); 
    } catch (error) {
      console.error('Verification failed', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleStudentClick = async (student: StudentProfile) => {
    // Show a quick fallback or loader if we want
    setActiveStudent(student);
    
    try {
      // Fetch full details since the table list only has summary data
      const fullDetails = await api.searchStudent(student.username);
      if (fullDetails) {
        setActiveStudent(fullDetails);
      }
    } catch (error) {
      console.error('Failed to load full student details', error);
    }
  };

  const getStatusBadge = (student: StudentProfile) => {
    if (student.verificationStatus === 'VERIFIED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
          <CheckCircle2 size={12} /> Verified
        </span>
      );
    }
    if (student.verificationStatus === 'NEEDS_CORRECTION') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
          <AlertCircle size={12} /> Flagged
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
        <ShieldCheck size={12} /> Pending Audit
      </span>
    );
  };
  
  // Filtered list of students based on class selection
  const filteredStudents = selectedClassId 
    ? students.filter(s => s.classId === Number(selectedClassId))
    : students;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      <PageHeader 
        title="Class Management Portal" 
        description="Review, verify, and manage students assigned to your grade."
      />

      {/* Primary Explorer Card */}
      <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 bg-white">
        <div className="flex items-center gap-3 mb-8">
          <Users size={28} className="text-[#2ab0c5]" />
          <h2 className="text-2xl font-black text-slate-800 tracking-tight" style={{ fontFamily: 'var(--font-fredoka)' }}>
            Student Class Explorer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Assigned Grade (Read Only) */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
              ASSIGNED GRADE
            </label>
            <div className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 flex items-center justify-between opacity-80 cursor-not-allowed">
               <span className="text-sm font-bold text-slate-500">
                   {isLoading ? 'Loading...' : (myGrade?.name ? `Grade ${myGrade.name}` : 'No Grade')}
               </span>
               <ChevronDown size={18} className="text-slate-300" />
            </div>
          </div>

          {/* Column 2: Select Class */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
              SELECT CLASS
            </label>
            <div className="relative">
                <select 
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-[#2ab0c5] transition-all text-sm font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat hover:border-slate-300"
                  value={selectedClassId}
                  onChange={(e) => {
                      setSelectedClassId(e.target.value === '' ? '' : Number(e.target.value));
                      if (activeStudent) setActiveStudent(null);
                  }}
                  disabled={isLoading}
                >
                  <option value="">All Classes in Grade {myGrade?.name}</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
            </div>
          </div>

          {/* Column 3: Quick Search */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
              QUICK SEARCH
            </label>
            <div className="relative">
                <Input 
                  placeholder="Search in class..." 
                  className="h-14 w-full bg-slate-50 border-slate-100 rounded-2xl pl-12 text-sm font-bold placeholder:text-slate-400 placeholder:font-normal focus:ring-4 focus:ring-cyan-500/10 focus:border-[#2ab0c5] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Area */}
      {!activeStudent ? (
          /* Student List View */
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden mt-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-slate-50 bg-slate-50 flex justify-between items-center">
                  <h3 className="font-black text-slate-800">
                      {selectedClassId 
                         ? `Students in ${classes.find(c => c.id === selectedClassId)?.name || 'Class'}` 
                         : `All Students in Grade ${myGrade?.name || ''}`}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredStudents.length} Students found</span>
              </div>
              
              {filteredStudents.length === 0 ? (
                  <div className="py-24 text-center text-slate-400 font-bold flex flex-col items-center justify-center">
                      <LayoutGrid size={48} className="text-slate-200 mb-4" />
                      No students found matching these filters.
                  </div>
              ) : (
                  <div className="w-full overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-100">
                        <TableRow>
                          <TableHead className="font-black text-xs text-slate-400 uppercase tracking-widest py-4 pl-8">Student</TableHead>
                          <TableHead className="font-black text-xs text-slate-400 uppercase tracking-widest py-4">Index No.</TableHead>
                          <TableHead className="font-black text-xs text-slate-400 uppercase tracking-widest py-4">Assigned Class</TableHead>
                          <TableHead className="font-black text-xs text-slate-400 uppercase tracking-widest py-4 text-right pr-8">Audit Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map(student => (
                          <TableRow 
                            key={student.id} 
                            onClick={() => handleStudentClick(student)}
                            className="cursor-pointer hover:bg-cyan-50/50 group border-b border-slate-50 transition-colors"
                          >
                            <TableCell className="pl-8 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#2ab0c5] font-black text-lg group-hover:bg-[#2ab0c5] group-hover:text-white transition-colors shadow-sm">
                                  {student.fullName ? student.fullName.charAt(0) : '?'}
                                </div>
                                <span className="font-bold text-slate-800 text-sm group-hover:text-[#2ab0c5] transition-colors">{student.fullName || 'Unknown Student'}</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className="text-xs font-bold text-slate-500 uppercase">{student.username}</span>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 bg-slate-50 px-3 py-1 rounded-full group-hover:bg-white transition-colors">
                                {student.className || 'NO CLASS'}
                              </span>
                            </TableCell>
                            <TableCell className="py-4 text-right pr-8">
                               {getStatusBadge(student)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              )}
          </div>
      ) : (
          /* Massive Profile Card Verification View */
          <div className="bg-white rounded-[3rem] w-full shadow-2xl shadow-slate-200/50 flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-700 relative border border-slate-100 overflow-hidden mt-8">
              
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#e1f5f8]/50 to-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative border-b border-slate-100">
                 <button 
                   onClick={() => setActiveStudent(null)}
                   className="absolute top-6 right-6 p-2 bg-white rounded-full border border-slate-100 hover:bg-slate-50 text-slate-400 z-20"
                 >
                     <AlertCircle className="rotate-45" size={20} />
                 </button>
                 
                 <div className="flex gap-6 items-center relative z-10">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2ab0c5] to-blue-600 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-cyan-200">
                       {activeStudent.fullName ? activeStudent.fullName.charAt(0) : '?'}
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 font-fredoka">{activeStudent.fullName || 'Unknown Student'}</h3>
                       <div className="flex flex-wrap items-center gap-3">
                           <span className="text-xs font-black text-slate-600 uppercase tracking-widest bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                               {activeStudent.username}
                           </span>
                           <span className="text-xs font-black text-[#2ab0c5] uppercase tracking-widest px-4 py-1.5 rounded-full border border-cyan-200 bg-cyan-50 shadow-sm">
                               {activeStudent.className || 'NO CLASS'}
                           </span>
                       </div>
                    </div>
                 </div>

                 <div className="relative z-10 flex flex-col items-end gap-2 mt-4 md:mt-0">
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</span>
                     {getStatusBadge(activeStudent)}
                 </div>
              </div>
              
              <div className="p-8 md:p-12 bg-white">
                 <div className="w-full overflow-hidden border border-slate-200 rounded-2xl shadow-sm">
                   <Table className="bg-white">
                      <TableBody>
                        {/* Identity Section */}
                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                          <TableCell colSpan={2} className="py-4 px-6 border-b border-slate-200">
                             <div className="flex items-center gap-3 text-slate-800">
                                 <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                                     <UserIcon size={16} />
                                 </div>
                                 <h4 className="font-black text-sm uppercase tracking-widest font-fredoka">Essential Identity</h4>
                             </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Date of Birth</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.dob || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Gender</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.gender || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Religion</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.religion || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">NIC Number</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.nic || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Birth Certificate</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.birthCertificateNumber || 'Not provided'}</TableCell>
                        </TableRow>

                        {/* Health & Contact Section */}
                        <TableRow className="bg-rose-50/50 hover:bg-rose-50/50 border-t-2 border-slate-100">
                          <TableCell colSpan={2} className="py-4 px-6 border-b border-rose-100/50">
                             <div className="flex items-center gap-3 text-rose-800">
                                 <div className="w-8 h-8 rounded-lg bg-white border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm">
                                     <HeartPulse size={16} />
                                 </div>
                                 <h4 className="font-black text-sm uppercase tracking-widest font-fredoka">Health & Contact</h4>
                             </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-rose-400 uppercase tracking-widest bg-rose-50/30">Medical & Allergies</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-rose-900">{activeStudent.medicalHistory || 'None reported.'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-rose-400 uppercase tracking-widest bg-rose-50/30">Blood Group</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-rose-900">
                             <span className="inline-flex items-center px-3 py-1 bg-white text-rose-600 rounded-lg border border-rose-100 text-xs font-black shadow-sm">
                                {activeStudent.bloodGroup || 'Unknown'}
                             </span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Primary Guardian</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.guardianName || 'Not provided'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50">Contact Number</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800">{activeStudent.guardianContact || 'No contact'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="w-1/3 py-4 px-6 font-bold text-xs text-slate-400 uppercase tracking-widest bg-slate-50/50 align-top">Residential Address</TableCell>
                          <TableCell className="py-4 px-6 font-bold text-slate-800 whitespace-normal leading-relaxed">{activeStudent.address || 'Not provided'}</TableCell>
                        </TableRow>
                      </TableBody>
                   </Table>
                 </div>
              </div>
              
              <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100">
                 <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end">
                     <div className="flex-1 w-full space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck size={14} className="text-[#2ab0c5]"/> Audit Feedback (Required for Rejection)
                        </label>
                        <textarea 
                          placeholder="Type a message explaining any issues found within their submitted documents..." 
                          className="w-full h-24 p-5 rounded-2xl bg-white border border-slate-200 font-bold text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:border-[#2ab0c5] focus:ring-cyan-500/10 transition-all resize-none shadow-sm"
                          value={auditComment}
                          onChange={(e) => setAuditComment(e.target.value)}
                        />
                     </div>
                     
                     <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
                        <Button 
                          variant="outline" 
                          className="h-14 px-8 rounded-2xl border-rose-200 text-rose-500 hover:bg-rose-50 font-black uppercase tracking-widest text-xs transition-all bg-white"
                          onClick={() => handleVerify('NEEDS_CORRECTION')}
                          isLoading={isVerifying}
                        >
                          <AlertCircle size={16} className="mr-2" />
                          Flag & Reject
                        </Button>
                        <Button 
                          className="h-14 px-8 rounded-2xl bg-[#2ab0c5] hover:bg-[#239fb4] text-white shadow-xl shadow-cyan-200 font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98]"
                          onClick={() => handleVerify('VERIFIED')}
                          isLoading={isVerifying}
                        >
                          <CheckCircle2 size={16} className="mr-2" />
                          Verify Credentials
                        </Button>
                     </div>
                 </div>
              </div>
          </div>
      )}
    </div>
  );
}

// Granular commit 2 for Step 5 (Frontend Integration)

// Granular commit 6 for Step 5 (Frontend Integration)

// Granular commit 10 for Step 5 (Frontend Integration)

// Granular commit 14 for Step 5 (Frontend Integration)

// Granular commit 18 for Step 5 (Frontend Integration)

// Granular commit 22 for Step 5 (Frontend Integration)

// Granular commit 26 for Step 5 (Frontend Integration)

// Granular commit 30 for Step 5 (Frontend Integration)
