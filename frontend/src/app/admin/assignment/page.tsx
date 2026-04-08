'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile, Grade } from '@/lib/api';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { User, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentAssignmentPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
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
      const [studentsData, gradesData, classesData] = await Promise.all([
        api.getUnassignedStudents(),
        api.getGrades(),
        api.getClasses()
      ]);
      setStudents(studentsData);
      setGrades(gradesData);
      setClasses(classesData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedStudent || !selectedGrade || !selectedClass) return;

    setIsSubmitting(true);
    setMessage(null);
    try {
      await api.assignStudent(selectedStudent, selectedGrade, selectedClass);
      setMessage({ type: 'success', text: 'Student assigned successfully!' });
      setSelectedStudent(null);
      setSelectedGrade(null);
      setSelectedClass(null);
      fetchInitialData();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to assign student' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredClasses = classes.filter(c => c.grade?.id === selectedGrade);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Student Assignment" 
        description="Place students into their respective grades and classes."
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
                <User size={18} className="text-blue-500" />
                Unassigned Students
              </h3>
              <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {students.length} Pending
              </span>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index Number</TableHead>
                  <TableHead>Guardian Name</TableHead>
                  <TableHead>Contact</TableHead>
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
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">
                      No unassigned students found
                    </TableCell>
                  </TableRow>
                ) : students.map((student) => (
                  <TableRow key={student.username} className={selectedStudent === student.username ? 'bg-blue-50/50' : ''}>
                    <TableCell className="font-medium text-slate-900">{student.username}</TableCell>
                    <TableCell>{student.guardianName || 'N/A'}</TableCell>
                    <TableCell>{student.guardianContact || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                         variant={selectedStudent === student.username ? 'primary' : 'outline'} 
                        size="sm"
                        onClick={() => setSelectedStudent(student.username)}
                      >
                        {selectedStudent === student.username ? 'Selected' : 'Select'}
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
              <BookOpen size={18} className="text-indigo-500" />
              Assignment Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Selected Student
                </label>
                <div className={`p-3 rounded-xl border ${selectedStudent ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 italic text-sm'}`}>
                  {selectedStudent || 'Select a student from the list'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Assign to Grade
                </label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm h-12"
                  value={selectedGrade || ''}
                  onChange={(e) => {
                    setSelectedGrade(Number(e.target.value));
                    setSelectedClass(null);
                  }}
                  disabled={!selectedStudent}
                >
                  <option value="">Select Grade</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Assign to Class
                </label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm h-12"
                  value={selectedClass || ''}
                  onChange={(e) => setSelectedClass(Number(e.target.value))}
                  disabled={!selectedGrade}
                >
                  <option value="">Select Class</option>
                  {filteredClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {selectedGrade && filteredClasses.length === 0 && (
                   <p className="mt-2 text-xs text-rose-500 italic">No classes found for this grade.</p>
                )}
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full" 
                  disabled={!selectedStudent || !selectedGrade || !selectedClass}
                  isLoading={isSubmitting}
                  onClick={handleAssign}
                >
                  Confirm Assignment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
