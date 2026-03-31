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
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [teachersData, classesData] = await Promise.all([
        api.getTeachers(),
        api.getClasses()
      ]);
      setTeachers(teachersData);
      setClasses(classesData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedTeacher || !selectedClass) return;

    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.assignTeacher(selectedTeacher, selectedClass);
      setMessage({ type: 'success', text: 'Teacher assigned to class successfully!' });
      setSelectedTeacher(null);
      setSelectedClass(null);
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
        description="Assign teachers to lead specific classes."
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
                    <TableCell className="font-medium">{teacher.username}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                        {teacher.role}
                      </span>
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
          <Card className="p-6 sticky top-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Home size={18} className="text-blue-500" />
              Class Selection
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Selected Teacher
                </label>
                <div className={`p-3 rounded-xl border ${selectedTeacher ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 italic text-sm'}`}>
                  {selectedTeacher ? `Teacher ID: ${selectedTeacher}` : 'Select a teacher from the list'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Target Class
                </label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm h-12"
                  value={selectedClass || ''}
                  onChange={(e) => setSelectedClass(Number(e.target.value))}
                  disabled={!selectedTeacher}
                >
                  <option value="">Select Class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.grade?.name} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full" 
                  disabled={!selectedTeacher || !selectedClass}
                  isLoading={isSubmitting}
                  onClick={handleAssign}
                >
                  Assign to Class
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
