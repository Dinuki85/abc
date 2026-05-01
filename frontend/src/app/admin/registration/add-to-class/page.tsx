"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Grade, StudentProfile } from '@/lib/api';
import { 
  Users, Search, Save, Plus, Trash2, 
  ArrowLeft, Loader2, UserCheck, School,
  Hash, LayoutGrid, Info
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface AssignmentEntry {
  indexNo: string;
  fullName: string;
  classPosition: string;
  isExisting?: boolean;
}

export default function BulkAssignPage() {
  const router = useRouter();
  
  // Selection State
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  
  // Entry State
  const [indexNo, setIndexNo] = useState('');
  const [classPosition, setClassPosition] = useState('');
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Queue State
  const [assignments, setAssignments] = useState<AssignmentEntry[]>([]);
  const [saving, setSaving] = useState(false);

  // Teacher State
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedTeacherNic, setSelectedTeacherNic] = useState('');
  const [selectedTeacherName, setSelectedTeacherName] = useState('');
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);

  // Initialize data
  useEffect(() => {
    api.getGrades().then(setGrades).catch(() => toast.error("Failed to load grades"));
    api.getTeachers().then(setTeachers).catch(() => console.error("Failed to load teachers"));
  }, []);

  // Fetch classes when grade changes
  useEffect(() => {
    if (selectedGradeId !== '') {
      api.getClassesByGrade(Number(selectedGradeId)).then(setClasses);
      // We don't clear selectedClassId here to allow atomic updates from teacher selection
    } else {
      setClasses([]);
    }
  }, [selectedGradeId]);

  // Handle class selection
  useEffect(() => {
    if (selectedClassId !== '') {
      const cls = classes.find(c => c.id === Number(selectedClassId));
      setSelectedClass(cls);
      if (cls?.classTeacher?.user?.username) {
        setSelectedTeacherNic(cls.classTeacher.user.username);
        setSelectedTeacherName(cls.classTeacher.name || '');
        setTeacherSearch(cls.classTeacher.name || '');
      } else {
        setSelectedTeacherNic('');
        setSelectedTeacherName('');
        setTeacherSearch('');
      }
    } else {
      setSelectedClass(null);
      setSelectedTeacherNic('');
      setSelectedTeacherName('');
      setTeacherSearch('');
    }
  }, [selectedClassId, classes]);

  // Fetch existing assignments when class changes
  useEffect(() => {
    if (selectedClassId !== '') {
      const loadExisting = async () => {
        try {
          const data = await api.getPaginatedStudents(0, 500, '', '', Number(selectedClassId));
          if (data && data.content) {
            const existing = data.content.map((s: any) => ({
              indexNo: s.username,
              fullName: s.fullName,
              classPosition: s.classPosition || '',
              isExisting: true
            }));
            setAssignments(existing);
          }
        } catch (err) {
          console.error("Failed to load existing students", err);
          setAssignments([]);
        }
      };
      loadExisting();
    } else {
      setAssignments([]);
    }
  }, [selectedClassId]);

  // Real-time student validation
  useEffect(() => {
    const lookup = async () => {
      if (indexNo.length >= 2) {
        setValidating(true);
        setValidationError(null);
        try {
          const student = await api.searchAdminStudent(indexNo);
          
          if (!selectedGradeId) {
            setValidationError("Please select a target grade level first.");
            setCurrentStudent(null);
            return;
          }

          if (!student?.gradeId) {
            setValidationError("Student is not yet assigned to any grade in the registry.");
            setCurrentStudent(null);
            return;
          }

          if (student.gradeId !== Number(selectedGradeId)) {
            setValidationError(`Student belongs to ${student.gradeName || 'another grade'}. Cannot add to this class.`);
            setCurrentStudent(null);
            return;
          }

          setValidationError(null);
          setCurrentStudent(student);
        } catch (err: any) {
          setValidationError(err.message || "Student not found in registry");
          setCurrentStudent(null);
        } finally {
          setValidating(false);
        }
      } else {
        setCurrentStudent(null);
        setValidationError(null);
      }
    };

    const timer = setTimeout(lookup, 400);
    return () => clearTimeout(timer);
  }, [indexNo]);

  const handleAddRow = async () => {
    let studentToAssign = currentStudent;
    
    if (!studentToAssign && indexNo.length >= 2) {
      setValidating(true);
      setValidationError(null);
      try {
        studentToAssign = await api.searchAdminStudent(indexNo);
        
        if (!selectedGradeId) {
          toast.error("Please select a target grade level first.");
          return;
        }

        if (!studentToAssign?.gradeId) {
          toast.error("Student is not yet assigned to any grade.");
          return;
        }

        if (studentToAssign.gradeId !== Number(selectedGradeId)) {
          toast.error(`Student belongs to ${studentToAssign.gradeName}. Cannot add to this class.`);
          return;
        }

        setCurrentStudent(studentToAssign);
      } catch (err: any) {
        toast.error(err.message || "Student not found in registry");
        studentToAssign = null;
      } finally {
        setValidating(false);
      }
    }

    if (!studentToAssign) {
      toast.error(validationError || "Please enter a valid Student Index No first");
      return;
    }
    
    if (assignments.find(a => a.indexNo === studentToAssign!.username)) {
      toast.error("Student is already in the assignment queue");
      return;
    }
    
    setAssignments([...assignments, {
      indexNo: studentToAssign!.username,
      fullName: studentToAssign!.fullName,
      classPosition: classPosition
    }]);
    
    // Clear inputs for next entry
    setIndexNo('');
    setClassPosition('');
    setCurrentStudent(null);
  };

  const handleRemoveRow = (idx: number) => {
    setAssignments(assignments.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!selectedClassId) {
      toast.error("Please select a target Class first");
      return;
    }
    if (assignments.length === 0) {
      toast.error("No students added to the queue");
      return;
    }

    setSaving(true);
    try {
      await api.bulkAssignStudents({
        classId: Number(selectedClassId),
        teacherNic: selectedTeacherNic,
        assignments: assignments.map(a => ({
          indexNo: a.indexNo,
          classPosition: a.classPosition
        }))
      });
      toast.success(`${assignments.length} students assigned successfully!`);
      setAssignments([]);
      router.push('/admin');
    } catch (err: any) {
      toast.error(err.message || "Bulk assignment failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header Bar */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => router.back()} className="rounded-2xl w-14 h-14 p-0 hover:bg-slate-50 border border-slate-100">
              <ArrowLeft size={24} className="text-slate-600" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Step 2: Enrollment</span>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Add To Class</h1>
              </div>
              <p className="text-sm font-bold text-slate-400">Institutional Bulk Assignment Registry</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Queue Status</p>
                <p className="text-sm font-black text-slate-800">{assignments.length} Students Pending</p>
             </div>
             <Button 
                onClick={handleSave} 
                disabled={saving || assignments.length === 0}
                className="bg-primary hover:bg-primary-hover text-white rounded-[1.25rem] px-10 h-14 font-black shadow-xl shadow-primary/20 flex items-center gap-3 transition-all active:scale-95 text-sm uppercase tracking-widest"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                Confirm Assignment
              </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-10">
        
        {/* Step 1: Target Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative">
             <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-4 -mt-4" />
             </div>
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                <LayoutGrid size={14} className="text-primary" /> Target Configuration
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <School size={12} className="text-slate-400" /> Grade Level
                   </label>
                   <select 
                     value={selectedGradeId} 
                     onChange={(e) => setSelectedGradeId(e.target.value ? Number(e.target.value) : '')}
                     className="w-full h-16 bg-slate-50 border-2 border-slate-50 rounded-[1.25rem] px-6 font-black text-slate-700 outline-none focus:border-primary focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                   >
                     <option value="">Select Grade</option>
                     {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                   </select>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Hash size={12} className="text-slate-400" /> School Class
                   </label>
                   <select 
                     value={selectedClassId} 
                     onChange={(e) => setSelectedClassId(e.target.value ? Number(e.target.value) : '')}
                     disabled={!selectedGradeId}
                     className="w-full h-16 bg-slate-50 border-2 border-slate-50 rounded-[1.25rem] px-6 font-black text-slate-700 outline-none focus:border-primary focus:bg-white transition-all disabled:opacity-40 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                   >
                     <option value="">Select Class</option>
                     {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                   </select>
                </div>

                <div className="space-y-3 relative">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <UserCheck size={12} className="text-slate-400" /> Assign Teacher (Optional)
                   </label>
                   <div className="relative">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                     <input 
                       type="text"
                       value={teacherSearch}
                       onChange={(e) => {
                         setTeacherSearch(e.target.value);
                         setShowTeacherDropdown(true);
                         if (selectedTeacherNic) {
                           setSelectedTeacherNic('');
                           setSelectedTeacherName('');
                         }
                       }}
                       onFocus={() => setShowTeacherDropdown(true)}
                       onBlur={() => setTimeout(() => setShowTeacherDropdown(false), 200)}
                       placeholder="Search by Name or NIC..."
                       className="w-full h-16 bg-slate-50 border-2 border-slate-50 rounded-[1.25rem] pl-14 pr-6 font-black text-slate-700 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                     />
                   </div>
                   
                   {showTeacherDropdown && (
                     <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-3xl shadow-2xl max-h-64 overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                       {(() => {
                         const filtered = teachers.filter(t => 
                           (t.name?.toLowerCase() || '').includes(teacherSearch.toLowerCase()) || 
                           (t.user?.username?.toLowerCase() || '').includes(teacherSearch.toLowerCase())
                         );
                         
                         if (filtered.length > 0) {
                           return filtered.map(t => (
                             <div 
                               key={t.id} 
                               className="p-4 hover:bg-primary/5 cursor-pointer border-b border-slate-50 last:border-0 transition-colors group"
                               onMouseDown={(e) => {
                                 e.preventDefault(); // Critical: Prevent onBlur from hiding dropdown before selection
                                 setSelectedTeacherNic(t.user?.username || '');
                                 setSelectedTeacherName(t.name || t.user?.username || '');
                                 setTeacherSearch(t.name || t.user?.username || '');
                                 
                                 // Auto-select class if teacher is already assigned
                                 if (t.classes && t.classes.length > 0) {
                                   const assignedClass = t.classes[0];
                                   if (assignedClass.grade?.id) {
                                     setSelectedGradeId(assignedClass.grade.id);
                                     // We need to wait for classes to be fetched for the new grade
                                     // But setSelectedClassId will be handled by the class list effect
                                     // or we can set it directly if we have the class object
                                     setSelectedClassId(assignedClass.id);
                                   }
                                 }
                                 
                                 setShowTeacherDropdown(false);
                               }}
                             >
                               <div className="flex items-center justify-between gap-4">
                                 <div>
                                   <div className="font-black text-slate-800 text-base group-hover:text-primary transition-colors leading-tight">
                                     {t.name || 'Staff Member'}
                                   </div>
                                   {t.designations && t.designations.length > 0 && (
                                     <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 opacity-70">
                                       {t.designations[0].replace(/_/g, ' ')}
                                     </div>
                                   )}
                                 </div>
                                 <div className="flex flex-col items-end gap-1">
                                   <div className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-lg shadow-sm">
                                     {t.user?.username}
                                   </div>
                                   <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Employee NIC</div>
                                 </div>
                               </div>
                             </div>
                           ));
                         } else {
                           return <div className="p-8 text-center text-xs font-bold text-slate-400 italic">No matching staff found</div>;
                         }
                       })()}
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Selected Supervisor</p>
             <div className="space-y-3">
               <h4 className="text-2xl font-black italic tracking-tight leading-tight">
                 {selectedTeacherName || (selectedClassId ? 'Unassigned' : 'Pending Selection')}
               </h4>
               {selectedTeacherNic && (
                 <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                   <span className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                     NIC: {selectedTeacherNic}
                   </span>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Step 2: Spreadsheet Entry */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="p-10 border-b border-slate-50 bg-slate-50/40 flex flex-wrap items-end gap-8">
            <div className="flex-grow min-w-[300px] space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student Index No</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={indexNo}
                  onChange={(e) => setIndexNo(e.target.value)}
                  placeholder="Enter Admission/Index Number..."
                  className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-8 font-black text-slate-700 outline-none focus:border-primary transition-all shadow-inner text-lg"
                />
                <div className="absolute right-4 top-4 flex items-center gap-2">
                   {validating && <Loader2 size={24} className="animate-spin text-slate-300" />}
                   {!validating && currentStudent && <UserCheck size={28} className="text-emerald-500 animate-in zoom-in" />}
                </div>
              </div>
              {currentStudent && (
                <div className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg inline-flex items-center gap-2 text-xs font-black uppercase tracking-tight animate-in fade-in slide-in-from-top-2">
                  <Info size={14} /> Identified: {currentStudent.fullName}
                </div>
              )}
              {validationError && (
                <div className="px-2 py-1 bg-rose-50 text-rose-600 rounded-lg inline-flex items-center gap-2 text-xs font-black uppercase tracking-tight animate-in fade-in slide-in-from-top-2">
                  <Info size={14} className="text-rose-400" /> {validationError}
                </div>
              )}
            </div>

            <div className="w-48 space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Class Position</label>
              <input 
                type="text" 
                value={classPosition}
                onChange={(e) => setClassPosition(e.target.value)}
                placeholder="e.g. 1"
                className="w-full h-16 bg-white border-2 border-slate-100 rounded-[1.25rem] px-6 font-black text-slate-700 outline-none focus:border-primary transition-all shadow-inner text-center"
              />
            </div>

            <Button 
              onClick={handleAddRow}
              className="h-16 rounded-[1.25rem] bg-slate-900 hover:bg-slate-800 text-white px-10 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={20} /> Add To Table
            </Button>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">#</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Index No</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Position</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-20">
                         <Users size={64} className="text-slate-400" />
                         <p className="font-black text-xl text-slate-600 italic uppercase tracking-widest">Assignment Queue Empty</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  assignments.map((row, i) => (
                    <tr key={row.indexNo} className="hover:bg-slate-50/50 transition-colors group animate-in slide-in-from-left-4 duration-300">
                      <td className="px-10 py-6 font-black text-slate-300">{i + 1}</td>
                      <td className="px-10 py-6 font-mono font-black text-primary text-lg tracking-tight">{row.indexNo}</td>
                      <td className="px-10 py-6">
                         <p className="font-black text-slate-700 uppercase text-sm leading-none mb-1">{row.fullName}</p>
                         <p className={`text-[10px] font-bold tracking-widest ${row.isExisting ? 'text-primary' : 'text-slate-400'}`}>
                           {row.isExisting ? 'CURRENTLY ASSIGNED' : 'VERIFIED IDENTITY'}
                         </p>
                      </td>
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-1">
                           <span className="text-primary font-black italic">#</span>
                           <input 
                             type="text" 
                             value={row.classPosition}
                             onChange={(e) => {
                               const newAssignments = [...assignments];
                               newAssignments[i].classPosition = e.target.value;
                               setAssignments(newAssignments);
                             }}
                             className="w-16 bg-primary/5 text-primary rounded-xl px-2 py-1 text-xs font-black italic border border-primary/10 shadow-sm focus:outline-none focus:border-primary transition-all text-center"
                             placeholder="N/A"
                           />
                         </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button 
                          onClick={() => handleRemoveRow(i)}
                          className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                        >
                          <Trash2 size={24} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 p-6 px-10 flex justify-between items-center border-t border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Students in current batch: {assignments.length}</p>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               Dest: <span className="text-primary">{selectedClass ? `${selectedClass.grade.name} - ${selectedClass.name}` : 'Not Selected'}</span>
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
