"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Grade } from '@/lib/api';
import { 
  Users, Search, Save, Plus, Trash2, 
  ArrowLeft, Loader2, UserCheck, School
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface AssignmentEntry {
  indexNo: string;
  fullName: string;
  classPosition: string;
}

export default function BulkAssignPage() {
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [selectedClass, setSelectedClass] = useState<any>(null);
  
  const [indexNo, setIndexNo] = useState('');
  const [classPosition, setClassPosition] = useState('');
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [validating, setValidating] = useState(false);
  
  const [assignments, setAssignments] = useState<AssignmentEntry[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getGrades().then(setGrades);
  }, []);

  useEffect(() => {
    if (selectedGradeId !== '') {
      api.getClassesByGrade(Number(selectedGradeId)).then(setClasses);
      setSelectedClassId('');
      setSelectedClass(null);
    } else {
      setClasses([]);
    }
  }, [selectedGradeId]);

  useEffect(() => {
    if (selectedClassId !== '') {
      const cls = classes.find(c => c.id === Number(selectedClassId));
      setSelectedClass(cls);
    } else {
      setSelectedClass(null);
    }
  }, [selectedClassId, classes]);

  // Real-time student lookup
  useEffect(() => {
    if (indexNo.length >= 4) {
      setValidating(true);
      const timer = setTimeout(() => {
        api.searchAdminStudent(indexNo)
          .then(student => {
            setCurrentStudent(student);
            setValidating(false);
          })
          .catch(() => {
            setCurrentStudent(null);
            setValidating(false);
          });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCurrentStudent(null);
    }
  }, [indexNo]);

  const handleAddRow = () => {
    if (!currentStudent) {
      toast.error("Please enter a valid Student Index No");
      return;
    }
    if (assignments.find(a => a.indexNo === indexNo)) {
      toast.error("Student already added to the list");
      return;
    }
    
    setAssignments([...assignments, {
      indexNo: currentStudent.username,
      fullName: currentStudent.fullName,
      classPosition: classPosition
    }]);
    
    // Clear inputs
    setIndexNo('');
    setClassPosition('');
    setCurrentStudent(null);
  };

  const handleRemoveRow = (idx: number) => {
    setAssignments(assignments.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!selectedClassId) {
      toast.error("Please select a class");
      return;
    }
    if (assignments.length === 0) {
      toast.error("Add at least one student to the list");
      return;
    }

    setSaving(true);
    try {
      await api.bulkAssignStudents({
        classId: Number(selectedClassId),
        assignments: assignments.map(a => ({
          indexNo: a.indexNo,
          classPosition: a.classPosition
        }))
      });
      toast.success("All students assigned successfully!");
      setAssignments([]);
      router.push('/admin/students');
    } catch (err: any) {
      toast.error(err.message || "Failed to assign students");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="rounded-full w-12 h-12 p-0">
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Bulk Class Assignment</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Institutional Management</p>
            </div>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={saving || assignments.length === 0}
            className="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-8">
        
        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <School size={12} /> Select Grade
            </label>
            <select 
              value={selectedGradeId} 
              onChange={(e) => setSelectedGradeId(e.target.value ? Number(e.target.value) : '')}
              className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.25rem_center] bg-no-repeat"
            >
              <option value="">Choose Grade...</option>
              {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Users size={12} /> Select Class
            </label>
            <select 
              value={selectedClassId} 
              onChange={(e) => setSelectedClassId(e.target.value ? Number(e.target.value) : '')}
              disabled={!selectedGradeId}
              className="w-full h-14 bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 font-bold text-slate-700 outline-none focus:border-primary focus:bg-white transition-all disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.25rem_center] bg-no-repeat"
            >
              <option value="">Choose Class...</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl flex flex-col justify-center">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Class Teacher</p>
            <h3 className="text-xl font-black">
              {selectedClass?.classTeacher?.name || (selectedClassId ? 'No Teacher Assigned' : 'Select a Class')}
            </h3>
            {selectedClass?.classTeacher?.user?.username && (
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">NIC: {selectedClass.classTeacher.user.username}</p>
            )}
          </div>
        </div>

        {/* Input Table Area */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-wrap items-end gap-6">
            <div className="flex-grow min-w-[250px] space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Index No</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={indexNo}
                  onChange={(e) => setIndexNo(e.target.value)}
                  placeholder="Enter Index No..."
                  className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-700 outline-none focus:border-primary transition-all shadow-sm"
                />
                {validating && <Loader2 size={18} className="absolute right-4 top-4 animate-spin text-slate-300" />}
                {!validating && currentStudent && <UserCheck size={18} className="absolute right-4 top-4 text-emerald-500" />}
              </div>
              {currentStudent && (
                <p className="text-xs font-bold text-emerald-600 ml-1 animate-in fade-in slide-in-from-top-1">
                  Matched: <span className="uppercase">{currentStudent.fullName}</span>
                </p>
              )}
            </div>

            <div className="w-40 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Position</label>
              <input 
                type="text" 
                value={classPosition}
                onChange={(e) => setClassPosition(e.target.value)}
                placeholder="e.g. 1"
                className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-700 outline-none focus:border-primary transition-all shadow-sm"
              />
            </div>

            <Button 
              onClick={handleAddRow}
              className="h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white px-8 font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              <Plus size={18} /> Add To Table
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Index No</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Position</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {assignments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-300 font-bold italic">
                      No students added to the temporary table yet.
                    </td>
                  </tr>
                ) : (
                  assignments.map((row, i) => (
                    <tr key={row.indexNo} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5 font-black text-slate-400">{i + 1}</td>
                      <td className="px-8 py-5 font-black text-slate-800 tracking-tight">{row.indexNo}</td>
                      <td className="px-8 py-5 font-bold text-slate-600 uppercase text-sm">{row.fullName}</td>
                      <td className="px-8 py-5 font-black text-primary italic">#{row.classPosition || '-'}</td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => handleRemoveRow(i)}
                          className="p-2 text-rose-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
