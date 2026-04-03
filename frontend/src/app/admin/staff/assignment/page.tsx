'use client';

import React, { useEffect, useState } from 'react';
import { api, Teacher, Grade } from '@/lib/api';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { UserSquare2, Home, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TeacherAssignmentPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [teachersData, gradesData] = await Promise.all([
        api.getTeachers(),
        api.getGrades()
      ]);
      setTeachers(teachersData);
      setGrades(gradesData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedTeacher || !selectedGrade) return;

    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.assignTeacherToGrade(selectedTeacher, selectedGrade);
      setMessage({ type: 'success', text: 'Teacher assigned to grade successfully!' });
      setSelectedTeacher(null);
      setSelectedGrade(null);
      fetchInitialData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to assign teacher' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Staff Assignment" 
        description="Assign teachers to oversee specific grades."
      />

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <UserSquare2 size={18} className="text-indigo-500" />
                Teaching Staff
              </h3>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                   Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="h-16 bg-slate-50/20 animate-pulse" colSpan={4}>&nbsp;</TableCell>
                    </TableRow>
                  ))
                ) : teachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">
                      No teachers found. Please register some staff first.
                    </TableCell>
                  </TableRow>
                ) : teachers.map((teacher) => (
                  <TableRow key={teacher.id} className={selectedTeacher === teacher.id ? 'bg-indigo-50/50' : ''}>
                    <TableCell className="font-bold text-slate-900">ID: {teacher.id}</TableCell>
                    <TableCell className="font-medium">{teacher.user?.username || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.designations?.map((d: string) => (
                          <span key={d} className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                            {d.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant={selectedTeacher === teacher.id ? 'primary' : 'outline'} 
                        size="sm"
                        onClick={() => setSelectedTeacher(teacher.id)}
                      >
                        {selectedTeacher === teacher.id ? 'Selected' : 'Select'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-8 rounded-[2rem] border-none shadow-xl shadow-slate-200/50 sticky top-6">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Home size={22} strokeWidth={2.5} />
              </div>
              Grade Assignment
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                  Selected Teacher
                </label>
                <div className={`h-14 flex items-center px-6 rounded-2xl border transition-all ${
                  selectedTeacher 
                    ? 'bg-blue-50/50 border-blue-200 text-blue-700 font-bold' 
                    : 'bg-slate-50 border-slate-100 text-slate-400 italic text-sm'
                }`}>
                  {selectedTeacher 
                    ? teachers.find(t => t.id === selectedTeacher)?.name || `Teacher ID: ${selectedTeacher}`
                    : 'Select a teacher from the list'
                  }
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                  Target Grade
                </label>
                <select 
                  className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-[#2ab0c5] transition-all text-sm font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                  value={selectedGrade || ''}
                  onChange={(e) => setSelectedGrade(Number(e.target.value))}
                  disabled={!selectedTeacher}
                >
                  <option value="">Select Grade</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-6">
                <Button 
                  className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] bg-[#2ab0c5] hover:bg-[#239fb4] text-white shadow-lg shadow-cyan-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none" 
                  disabled={!selectedTeacher || !selectedGrade}
                  isLoading={isSubmitting}
                  onClick={handleAssign}
                >
                  Assign to Grade
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
