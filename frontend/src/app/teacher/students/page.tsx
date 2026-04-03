'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile } from '@/lib/api';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Users, FileCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { VerifyModal } from '@/components/teacher/VerifyModal';

export default function MyStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [myClass, setMyClass] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const classData = await api.getMyClass();
      setMyClass(classData);
      if (classData?.id) {
        const studentsData = await api.getStudentsByClass(classData.id);
        setStudents(studentsData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifySuccess = () => {
    setIsModalOpen(false);
    setMessage({ type: 'success', text: 'Student verification updated successfully!' });
    fetchInitialData();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Classroom Management" 
        description={myClass ? `Managing students for Grade ${myClass.grade?.name} - ${myClass.name}` : "View and verify student profiles."}
      />

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <Card className="p-0 overflow-hidden shadow-sm border border-white/60">
        <div className="p-4 border-b border-slate-100 bg-emerald-50/20 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Users size={18} className="text-emerald-500" />
            Class List: {students.length} Students
          </h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 h-8 border-slate-200"
            onClick={fetchInitialData}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Parent Contact</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="h-16 bg-slate-50/10 animate-pulse" colSpan={4}>&nbsp;</TableCell>
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow key="empty">
                <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">
                  No students assigned to your class yet.
                </TableCell>
              </TableRow>
            ) : students.map((student) => (
              <TableRow key={student.username}>
                <TableCell className="font-bold text-slate-900">{student.username}</TableCell>
                <TableCell>
                  {student.profileCompleted ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold uppercase border border-emerald-200">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-bold uppercase border border-slate-200">
                      Incomplete
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{student.guardianContact || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-emerald-600"
                    disabled={!student.profileCompleted}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsModalOpen(true);
                    }}
                  >
                    <FileCheck size={16} className="mr-2" />
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {isModalOpen && selectedStudent && (
        <VerifyModal 
          student={selectedStudent} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleVerifySuccess}
        />
      )}
    </div>
  );
}
