'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { 
  Users, 
  Search, 
  Plus, 
  Save, 
  Trash2, 
  UserPlus, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  UserCheck,
  LayoutList
} from 'lucide-react';

interface QueuedStudent {
  indexNo: string;
  name: string;
  classPosition: string;
}

export default function StudentBulkAssignmentPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [classSearchId, setClassSearchId] = useState('');
  
  const [studentIndexNo, setStudentIndexNo] = useState('');
  const [classPosition, setClassPosition] = useState('');
  const [foundStudent, setFoundStudent] = useState<StudentProfile | null>(null);
  
  const [queuedStudents, setQueuedStudents] = useState<QueuedStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingClass, setIsSearchingClass] = useState(false);
  const [isSearchingStudent, setIsSearchingStudent] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await api.getClasses();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchClass = () => {
    setIsSearchingClass(true);
    const cls = classes.find(c => c.id.toString() === classSearchId);
    if (cls) {
      setSelectedClass(cls);
      setMessage(null);
    } else {
      setSelectedClass(null);
      setMessage({ type: 'error', text: 'Class not found' });
    }
    setIsSearchingClass(false);
  };

  const handleSearchStudent = async () => {
    if (!studentIndexNo) return;
    setIsSearchingStudent(true);
    setFoundStudent(null);
    try {
      const student = await api.searchAdminStudent(studentIndexNo);
      if (student) {
        setFoundStudent(student);
      } else {
        setMessage({ type: 'error', text: 'Student not found' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error searching student' });
    } finally {
      setIsSearchingStudent(false);
    }
  };

  const addToTable = () => {
    if (!foundStudent || !studentIndexNo) return;
    
    // Prevent duplicates
    if (queuedStudents.find(s => s.indexNo === studentIndexNo)) {
      setMessage({ type: 'error', text: 'Student already added to the list' });
      return;
    }

    const newStudent: QueuedStudent = {
      indexNo: studentIndexNo,
      name: foundStudent.fullName || 'N/A',
      classPosition: classPosition
    };

    setQueuedStudents([...queuedStudents, newStudent]);
    setStudentIndexNo('');
    setClassPosition('');
    setFoundStudent(null);
    setMessage(null);
  };

  const removeFromTable = (indexNo: string) => {
    setQueuedStudents(queuedStudents.filter(s => s.indexNo !== indexNo));
  };

  const handleSave = async () => {
    if (!selectedClass || queuedStudents.length === 0) return;

    setIsLoading(true);
    try {
      await api.bulkAssignStudents({
        classId: selectedClass.id,
        assignments: queuedStudents.map(s => ({
          indexNo: s.indexNo,
          classPosition: s.classPosition
        }))
      });
      setMessage({ type: 'success', text: `Successfully assigned ${queuedStudents.length} students to ${selectedClass.grade?.name}-${selectedClass.name}` });
      setQueuedStudents([]);
      setStudentIndexNo('');
      setClassPosition('');
      setFoundStudent(null);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save assignments' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Top Navigation Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">
            Add To Class
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Enter Class ID" 
              className="pl-11 h-12 w-full lg:w-48 rounded-xl border-slate-200 focus:ring-indigo-500/20 font-bold"
              value={classSearchId}
              onChange={(e) => setClassSearchId(e.target.value)}
            />
          </div>
          <Button 
            className="h-12 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200"
            onClick={handleSearchClass}
            isLoading={isSearchingClass}
          >
            Search
          </Button>
          <button className="text-rose-500 font-black text-xs uppercase tracking-[0.2em] border-b-2 border-rose-500/30 hover:border-rose-500 transition-all ml-2">
            List
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-5 rounded-[1.5rem] flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 shadow-md ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <p className="text-sm font-bold tracking-tight">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Main Entry Container */}
        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-slate-50/50 border border-white">
          <CardContent className="p-10 space-y-10">
            
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Class Identity</label>
                <div className="h-14 px-6 bg-white border border-slate-200 rounded-2xl flex items-center font-bold text-indigo-600 shadow-sm">
                  {selectedClass ? `${selectedClass.grade?.name} - ${selectedClass.name}` : <span className="text-slate-300 italic">Select from search above</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Teacher ID / NIC</label>
                <div className="h-14 px-6 bg-white border border-slate-200 rounded-2xl flex items-center font-bold text-slate-700 shadow-sm">
                  {selectedClass?.classTeacher?.nic || selectedClass?.classTeacher?.user?.username || 'Not Assigned'}
                </div>
              </div>
            </div>

            {/* Entry Row */}
            <div className="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 shadow-inner grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-2">Student Index No</label>
                <div className="relative">
                  <Input 
                    placeholder="Index No:" 
                    className="h-14 pl-12 rounded-2xl border-indigo-100 bg-white focus:ring-indigo-500/20 font-bold"
                    value={studentIndexNo}
                    onChange={(e) => setStudentIndexNo(e.target.value)}
                    onBlur={handleSearchStudent}
                  />
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                  {isSearchingStudent && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] ml-2">Class Position</label>
                <div className="relative">
                  <Input 
                    placeholder="Class Position" 
                    className="h-14 pl-12 rounded-2xl border-indigo-100 bg-white focus:ring-indigo-500/20 font-bold"
                    value={classPosition}
                    onChange={(e) => setClassPosition(e.target.value)}
                  />
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
                </div>
              </div>

              <Button 
                className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 group active:scale-95 transition-all"
                disabled={!foundStudent || !selectedClass}
                onClick={addToTable}
              >
                <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform" />
                Add To Table
              </Button>
            </div>

            {/* Student Name Preview */}
            {foundStudent && (
              <div className="px-6 py-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <UserCheck size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Identified Student</p>
                  <p className="text-sm font-bold text-slate-800 tracking-tight">{foundStudent.fullName}</p>
                </div>
              </div>
            )}

            {/* Table Area */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
               <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30 flex items-center gap-3">
                  <LayoutList size={18} className="text-slate-400" />
                  <h4 className="font-bold text-slate-600 text-sm tracking-tight">Assignment Queue</h4>
               </div>
               <div className="overflow-x-auto min-h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="w-16 px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 text-center">#</TableHead>
                        <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Index No</TableHead>
                        <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Student Name</TableHead>
                        <TableHead className="py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Class Position</TableHead>
                        <TableHead className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queuedStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-32 text-center">
                            <div className="flex flex-col items-center gap-4 opacity-20">
                               <Users size={64} className="text-slate-300" />
                               <p className="font-black text-lg uppercase tracking-widest">Table Empty</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : queuedStudents.map((s, idx) => (
                        <TableRow key={s.indexNo} className="hover:bg-slate-50/50 group transition-all">
                          <TableCell className="px-8 py-4 text-center font-bold text-slate-400">{idx + 1}</TableCell>
                          <TableCell className="py-4 font-black text-indigo-600 tabular-nums">{s.indexNo}</TableCell>
                          <TableCell className="py-4 font-bold text-slate-700">{s.name}</TableCell>
                          <TableCell className="py-4 font-medium text-slate-500 italic">{s.classPosition || '—'}</TableCell>
                          <TableCell className="px-8 py-4 text-right">
                            <button 
                              onClick={() => removeFromTable(s.indexNo)}
                              className="p-3 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                            >
                              <Trash2 size={16} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
               </div>
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-4">
              <Button 
                className="h-16 px-16 bg-[#e8cbb6] hover:bg-[#d6ba9d] text-[#6d4c41] rounded-2xl font-black text-lg uppercase tracking-[0.2em] shadow-xl shadow-[#e8cbb6]/20 transition-all active:scale-95 border border-[#d6ba9d]"
                disabled={queuedStudents.length === 0 || !selectedClass}
                onClick={handleSave}
                isLoading={isLoading}
              >
                Save Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
