"use client";

import React, { useState } from 'react';
import { 
  Plus, Save, Users, BookOpen, GraduationCap, 
  Search, ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface AssignmentEntry {
  indexNo: string;
  studentName: string;
  classPosition: string;
}

export default function AddToClassPage() {
  const [classId, setClassId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  
  const [teacherSearch, setTeacherSearch] = useState('');
  const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [studentIndex, setStudentIndex] = useState('');
  const [classPosition, setClassPosition] = useState('');
  
  const [assignments, setAssignments] = useState<AssignmentEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    api.getTeachers().then(data => {
      setTeachers(data);
    }).catch(err => console.error("Failed to fetch teachers", err));
  }, []);

  // Mock function to simulate fetching a student's name
  const fetchStudentName = (index: string) => {
    if (!index) return '';
    return `Student ${index}`; // In reality, this would hit an API or search locally
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIndex) return;
    
    if (assignments.some(a => a.indexNo === studentIndex)) {
      toast.error("Student is already in the queue.");
      return;
    }
    
    const newEntry: AssignmentEntry = {
      indexNo: studentIndex,
      studentName: fetchStudentName(studentIndex),
      classPosition: classPosition || 'N/A'
    };
    
    setAssignments([...assignments, newEntry]);
    setStudentIndex('');
    setClassPosition('');
  };

  const handleRemove = (indexToRemove: number) => {
    setAssignments(assignments.filter((_, i) => i !== indexToRemove));
  };

  const handleSave = async () => {
    if (assignments.length === 0 || !classId) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        classId: parseInt(classId), // Assuming classId is numeric ID, might need a dropdown actually
        teacherNic: teacherId,
        assignments: assignments.map(a => ({
          indexNo: a.indexNo,
          classPosition: a.classPosition
        }))
      };
      await api.bulkAssignStudents(payload);
      
      toast.success('Assignments saved successfully!');
      setAssignments([]);
      setClassId('');
      setTeacherId('');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to save assignments.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 pb-20">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
              <Users size={28} />
            </div>
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight font-handlee">
              Add To Class
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-15">
            Bulk Student Assignment Registry
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            
            {/* Global Settings */}
            <div className="space-y-6 pb-8 border-b border-slate-100">
               <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                 <BookOpen size={14} className="text-orange-500" />
                 Target Configuration
               </h4>
               
               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Class ID (Numeric)</label>
                   <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     <Input 
                       value={classId}
                       onChange={(e) => setClassId(e.target.value)}
                       placeholder="e.g. 1" 
                       type="number"
                       className="pl-10 h-12 rounded-xl border-gray-200 bg-slate-50/50" 
                     />
                   </div>
                 </div>
                  <div className="space-y-2 relative">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Teacher Search (Name or NIC)</label>
                   <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     <Input 
                       value={teacherSearch}
                       onChange={(e) => {
                         setTeacherSearch(e.target.value);
                         setShowTeacherDropdown(true);
                       }}
                       onFocus={() => setShowTeacherDropdown(true)}
                       placeholder="Search teacher name..." 
                       className="pl-10 h-12 rounded-xl border-gray-200 bg-slate-50/50" 
                     />
                   </div>
                   
                   {showTeacherDropdown && teacherSearch && (
                     <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                       {teachers.filter(t => t.name?.toLowerCase().includes(teacherSearch.toLowerCase()) || t.username?.includes(teacherSearch) || t.nic?.includes(teacherSearch)).length > 0 ? (
                         teachers.filter(t => t.name?.toLowerCase().includes(teacherSearch.toLowerCase()) || t.username?.includes(teacherSearch) || t.nic?.includes(teacherSearch)).map(t => (
                           <div 
                             key={t.id} 
                             className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                             onClick={() => {
                               setTeacherId(t.nic || t.username || '');
                               setTeacherSearch(t.name || t.nic || t.username || '');
                               setShowTeacherDropdown(false);
                             }}
                           >
                             <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                             <div className="text-xs text-slate-500">NIC: {t.nic || t.username}</div>
                           </div>
                         ))
                       ) : (
                         <div className="p-4 text-center text-sm text-slate-500">No teachers found</div>
                       )}
                     </div>
                   )}
                   {teacherId && !showTeacherDropdown && (
                     <p className="text-[10px] font-bold text-emerald-600 ml-2 mt-1 flex items-center gap-1">
                       <ShieldCheck size={12} /> Selected NIC: {teacherId}
                     </p>
                   )}
                 </div>
               </div>
            </div>

            {/* Addition Form */}
            <form onSubmit={handleAdd} className="space-y-6 pt-2">
               <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                 <GraduationCap size={14} className="text-primary" />
                 Student Entry
               </h4>
               
               <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Student Index No</label>
                   <Input 
                     value={studentIndex}
                     onChange={(e) => setStudentIndex(e.target.value)}
                     placeholder="Index number" 
                     className="h-12 rounded-xl border-gray-200 bg-slate-50/50 font-mono text-primary font-bold" 
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Class Position</label>
                   <Input 
                     value={classPosition}
                     onChange={(e) => setClassPosition(e.target.value)}
                     placeholder="e.g. Prefect, Monitor" 
                     className="h-12 rounded-xl border-gray-200 bg-slate-50/50" 
                   />
                 </div>
                 
                 <Button type="submit" className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold tracking-widest uppercase text-[11px] flex items-center justify-center gap-2 mt-4 shadow-xl shadow-slate-200">
                   <Plus size={16} />
                   Add To Table
                 </Button>
               </div>
            </form>
            
          </div>
        </div>

        {/* Right Table Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
             
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
                  Assignment Queue
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs ml-2">
                    {assignments.length}
                  </span>
                </h3>
             </div>

             <div className="flex-1 overflow-auto">
               <Table>
                 <TableHeader className="bg-slate-50/50 sticky top-0 z-10 shadow-sm">
                   <TableRow>
                     <TableHead className="w-16 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">#</TableHead>
                     <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Index No</TableHead>
                     <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Name</TableHead>
                     <TableHead className="py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class Position</TableHead>
                     <TableHead className="w-16 py-4 text-right pr-6">Action</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {assignments.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={5} className="h-64 text-center">
                         <div className="flex flex-col items-center gap-2 text-slate-400">
                           <Users size={32} className="opacity-20 mb-2" />
                           <p className="font-medium text-sm">No students queued for assignment</p>
                           <p className="text-xs opacity-60">Use the form on the left to add students</p>
                         </div>
                       </TableCell>
                     </TableRow>
                   ) : (
                     assignments.map((assignment, idx) => (
                       <TableRow key={idx} className="hover:bg-slate-50/50 transition-colors">
                         <TableCell className="px-6 py-4 text-xs font-black text-slate-400">{idx + 1}</TableCell>
                         <TableCell className="py-4 font-mono font-bold text-primary text-sm">{assignment.indexNo}</TableCell>
                         <TableCell className="py-4 font-bold text-slate-700 text-sm">{assignment.studentName}</TableCell>
                         <TableCell className="py-4 text-sm">
                           <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold border border-slate-200">
                             {assignment.classPosition}
                           </span>
                         </TableCell>
                         <TableCell className="py-4 text-right pr-6">
                           <button 
                             onClick={() => handleRemove(idx)}
                             className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                           >
                             <X size={16} />
                           </button>
                         </TableCell>
                       </TableRow>
                     ))
                   )}
                 </TableBody>
               </Table>
             </div>

             <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <p className="text-xs font-medium text-slate-500">
                  Target Class: <span className="font-bold text-slate-700">{classId || 'Not Set'}</span>
                </p>
                <Button 
                  onClick={handleSave}
                  disabled={assignments.length === 0 || !classId}
                  className="h-12 px-8 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-xl shadow-orange-500/30 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                  isLoading={isSubmitting}
                >
                  <Save size={18} />
                  Save Assignments
                </Button>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
