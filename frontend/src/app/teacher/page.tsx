'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { PageHeader } from '@/components/ui/PageHeader';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search,
  LayoutGrid,
  ChevronDown,
  User as UserIcon,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Star,
  MapPin
} from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function TeacherDashboard() {
  const router = useRouter();
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
  const [studentTab, setStudentTab] = useState<'basic' | 'health' | 'skills' | 'contact' | 'exams'>('basic');
  const [teacherProfile, setTeacherProfile] = useState<any>(null);



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

  const fetchData = async (hideLoadingState = false) => {
    if (!hideLoadingState) setIsLoading(true);
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
      if (!hideLoadingState) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(() => {
      fetchData(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const user = api.getCurrentUser();
    if (user) {
      api.getTeacherProfile(user.username).then(setTeacherProfile);
    }
  }, []);

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

      {/* Incomplete Profile Alert Banner */}
      {teacherProfile && !teacherProfile.profileCompleted && (
        <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2rem] p-8 text-white shadow-xl shadow-orange-200/50 flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
               <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black tracking-tight">Your Staff Profile is Incomplete</h4>
              <p className="text-white/80 text-sm font-medium">Please complete your registration to access all institutional features.</p>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/dashboard/teacher/profile-setup')}
            className="bg-slate-900 text-white hover:bg-slate-800 px-10 h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-black/20 active:scale-95 transition-all"
          >
            Set up Profile Now
          </Button>
        </div>
      )}

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
          /* Massive Profile Card Verification View - Enhanced with Tabs */
          <div className="bg-white rounded-[3rem] w-full shadow-2xl shadow-slate-200/50 flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-700 relative border border-slate-100 overflow-hidden mt-8">
              
              <div className="p-8 md:p-12 bg-gradient-to-br from-[#e1f5f8]/50 to-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative border-b border-slate-100">
                 <button 
                   onClick={() => setActiveStudent(null)}
                   className="absolute top-6 right-6 p-2 bg-white rounded-full border border-slate-100 hover:bg-slate-50 text-slate-400 z-20 shadow-sm"
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

              {/* Tab Selector for Student Profile */}
              <div className="bg-slate-50 p-2 flex gap-1 overflow-x-auto scrollbar-hide border-b border-slate-100">
                {[
                  { id: 'basic', label: 'Tab 1 - Basic', icon: UserIcon },
                  { id: 'health', label: 'Tab 2 - Health', icon: HeartPulse },
                  { id: 'skills', label: 'Tab 3 - Skills', icon: Star },
                  { id: 'contact', label: 'Tab 4 - Contact', icon: MapPin },
                  { id: 'exams', label: 'Tab 5 - Exams', icon: ShieldCheck },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setStudentTab(t.id as any)}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      studentTab === t.id 
                        ? 'bg-white text-[#2ab0c5] shadow-md border border-cyan-100' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <t.icon size={14} />
                    {t.label}
                  </button>
                ))}
              </div>
              
              <div className="p-8 md:p-12 bg-white min-h-[400px]">
                 <div className="w-full overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
                    <Table>
                       <TableBody>
                         {studentTab === 'basic' && (
                           <>
                             <VerificationRow label="Full Name" value={activeStudent.fullName} />
                             <VerificationRow label="Name in Sinhala" value={activeStudent.nameSinhala} />
                             <VerificationRow label="Name With Initials" value={activeStudent.nameWithInitials} />
                             <VerificationRow label="Date Of Birth" value={activeStudent.dob} />
                             <VerificationRow label="Gender" value={activeStudent.gender} />
                             <VerificationRow label="Religion" value={activeStudent.religion} />
                             <VerificationRow label="NIC Number" value={activeStudent.nic} />
                             <VerificationRow label="Birth Certificate" value={activeStudent.birthCertificateNumber} />
                             <VerificationRow label="Mother Name" value={activeStudent.motherName} />
                             <VerificationRow label="Father Name" value={activeStudent.fatherName} />
                             <VerificationRow label="Guardian ID" value={activeStudent.guardianIdRef} />
                           </>
                         )}
                         {studentTab === 'health' && (
                           <>
                             <VerificationRow label="Height" value={activeStudent.height} />
                             <VerificationRow label="Weight" value={activeStudent.weight} />
                             <VerificationRow label="Blood Group" value={activeStudent.bloodGroup} highlight />
                             <VerificationRow label="Physical Condition" value={activeStudent.specialPhysicalCondition} />
                             <VerificationRow label="Special Illness" value={activeStudent.specialIllness} />
                             <VerificationRow label="Long term diseases" value={activeStudent.longTermDiseases} />
                             <VerificationRow label="Special Need" value={activeStudent.specialNeed} />
                             <VerificationRow label="Medical Description" value={activeStudent.medicalDescription} />
                           </>
                         )}
                         {studentTab === 'skills' && (
                           <>
                             <VerificationRow label="Int. Achievements" value={activeStudent.achievementInternational} />
                             <VerificationRow label="Nat. Achievements" value={activeStudent.achievementNational} />
                             <VerificationRow label="Zonal Achievements" value={activeStudent.achievementZonal} />
                             <VerificationRow label="Talent Description" value={activeStudent.talentDescription} />
                             <VerificationRow label="Talent Areas" value={[
                               activeStudent.talentAgri && 'Agriculture',
                               activeStudent.talentIct && 'ICT',
                               activeStudent.talentAesthetic && 'Aesthetic',
                               activeStudent.talentMedia && 'Media',
                               activeStudent.talentSport && 'Sport',
                               activeStudent.talentInnovation && 'Innovation'
                             ].filter(Boolean).join(', ') || 'None Selected'} />
                           </>
                         )}
                         {studentTab === 'contact' && (
                           <>
                             <VerificationRow label="Permanent Address" value={activeStudent.addressPermanent} />
                             <VerificationRow label="Temporary Address" value={activeStudent.addressTemporary} />
                             <VerificationRow label="Emergency Contact" value={activeStudent.contactEmergency} highlight />
                             <VerificationRow label="Whatsapp No" value={activeStudent.contactWhatsapp} />
                             <VerificationRow label="Home No" value={activeStudent.contactHome} />
                             <VerificationRow label="Mobile No" value={activeStudent.contactMobile} highlight />
                             <VerificationRow label="Email" value={activeStudent.contactEmail} />
                             <VerificationRow label="Distance to School" value={activeStudent.distanceToSchool} />
                           </>
                         )}
                         {studentTab === 'exams' && (
                           <>
                             <VerificationRow label="Grade 05 Score" value={activeStudent.resultGrade05} />
                             <VerificationRow label="GCE OL Result" value={activeStudent.resultGceOl} />
                           </>
                         )}
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

function VerificationRow({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) {
  return (
    <TableRow>
      <TableCell className="w-1/3 py-4 px-6 font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/50">{label}</TableCell>
      <TableCell className={`py-4 px-6 font-bold text-sm ${highlight ? 'text-indigo-600' : 'text-slate-800'}`}>
        {value || <span className="text-rose-300 italic font-normal">Not Provided</span>}
      </TableCell>
    </TableRow>
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
