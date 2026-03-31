'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  GraduationCap, 
  UserCheck, 
  AlertCircle, 
  LayoutGrid, 
  List,
  ChevronRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockApi, MockStudent, Grade, Class } from '@/lib/mock-api';

export default function AssignmentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [unassignedStudents, setUnassignedStudents] = useState<MockStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<MockStudent | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUnassignedStudents(mockApi.getUnassignedStudents());
    setGrades(mockApi.getGrades());
  }, []);

  useEffect(() => {
    if (selectedGradeId) {
      setClasses(mockApi.getClassesByGrade(selectedGradeId));
      setSelectedClassId(null);
    } else {
      setClasses([]);
    }
  }, [selectedGradeId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const student = mockApi.searchStudent(searchQuery);
    if (student) {
      setSelectedStudent(student);
      setSelectedGradeId(student.gradeId || null);
      setSelectedClassId(student.classId || null);
    } else {
      setError('Student not found.');
    }
  };

  const handleAssign = () => {
    if (!selectedStudent || !selectedGradeId || !selectedClassId) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const result = mockApi.assignClass(selectedStudent.username, selectedGradeId, selectedClassId);
      if (result) {
        setSuccess(`Successfully assigned ${selectedStudent.fullName} to ${mockApi.getGradeName(selectedGradeId)} - ${mockApi.getClassName(selectedClassId)}`);
        setUnassignedStudents(mockApi.getUnassignedStudents());
        setSelectedStudent(null);
        setSearchQuery('');
        setSelectedGradeId(null);
        setSelectedClassId(null);
        
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError('Assignment failed.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
              <UserPlus size={32} />
            </div>
            Grade Assignment
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Assign students to Grades 1–13 and specific classes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Search & Assignment */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Search className="text-blue-600" size={20} />
              Find Student
            </h3>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Enter Index Number (e.g. STU2024001)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-blue-600/10"
                />
              </div>
              <Button type="submit" className="h-14 px-8 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest">
                Search
              </Button>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-2"
                >
                  <AlertCircle size={18} />
                  <p className="font-bold">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {selectedStudent && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-blue-600"
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-3xl font-black">
                  {selectedStudent.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedStudent.fullName}</h2>
                  <p className="text-blue-600 font-bold tracking-widest uppercase text-sm">{selectedStudent.username}</p>
                  <p className="text-slate-400 text-sm mt-1">{selectedStudent.profileData?.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-600" />
                    Select Grade (1–13)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {grades.map((grade) => (
                      <button
                        key={grade.id}
                        onClick={() => setSelectedGradeId(grade.id)}
                        className={`p-3 rounded-xl border-2 font-bold text-center transition-all ${
                          selectedGradeId === grade.id 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                          : 'border-slate-100 text-slate-600 hover:border-blue-200'
                        }`}
                      >
                        {grade.id}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid size={16} className="text-blue-600" />
                    Select Class
                  </label>
                  {!selectedGradeId ? (
                    <div className="h-32 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 font-bold">
                      Select a Grade First
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {classes.map((cls) => (
                        <button
                          key={cls.id}
                          onClick={() => setSelectedClassId(cls.id)}
                          className={`p-4 rounded-xl border-2 font-black text-center transition-all ${
                            selectedClassId === cls.id 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'border-slate-100 text-slate-600 hover:border-indigo-200'
                          }`}
                        >
                          {cls.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between gap-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedStudent(null)}
                  className="px-8 font-bold text-slate-400 hover:text-rose-600 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAssign}
                  disabled={!selectedGradeId || !selectedClassId || isLoading}
                  isLoading={isLoading}
                  className="flex-1 h-16 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Confirm & Assign Student
                </Button>
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Column: Queue */}
        <div className="space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <List className="text-indigo-600" size={20} />
              Assignment Queue
            </h3>
            
            <AnimatePresence mode="popLayout">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-start gap-2"
                >
                  <CheckCircle2 size={18} className="mt-1 shrink-0" />
                  <p className="text-sm font-bold leading-tight">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {unassignedStudents.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-slate-400 font-bold">Queue is empty!</p>
                  <p className="text-xs text-slate-300">All students have been assigned.</p>
                </div>
              ) : (
                unassignedStudents.map((stu) => (
                  <div 
                    key={stu.username}
                    onClick={() => {
                      setSelectedStudent(stu);
                      setSelectedGradeId(null);
                      setSelectedClassId(null);
                    }}
                    className="p-4 rounded-2xl border border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer group hover:bg-white hover:shadow-md hover:border-slate-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {stu.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{stu.fullName}</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">{stu.username}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black text-lg mb-1">Office Staff Tip</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Students appear in the queue only after they have completed their profile setup. Once assigned, their class teacher will receive a notification for verification.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}
