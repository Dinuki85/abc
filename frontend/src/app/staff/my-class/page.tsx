'use client';

import React, { useEffect, useState } from 'react';
import { api, StudentProfile } from '@/lib/api';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Users, FileCheck, CheckCircle2, AlertCircle, RefreshCw, Search } from 'lucide-react';
import { VerifyModal } from '@/components/teacher/VerifyModal';
import { Input } from '@/components/ui/Input';

export default function MyClassPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [myClass, setMyClass] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const staffData = await api.getStaffProfile();
      const classData = staffData?.assignedClass;
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

  const filteredStudents = students.filter(s => 
    s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.fullName && s.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-nunito animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="My Classroom" 
          description={myClass ? `Managing students for Grade ${myClass.grade?.name} - ${myClass.name}` : "View and verify student profiles for your assigned class."}
        />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-11 border-slate-200 bg-white"
            onClick={fetchInitialData}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-bold text-sm tracking-tight">{message.text}</p>
        </div>
      )}

      <Card className="p-0 overflow-hidden shadow-xl shadow-slate-200/50 border-none bg-white/70 backdrop-blur-md rounded-3xl">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users size={20} />
             </div>
             <div>
                <h3 className="font-bold text-slate-800 tracking-tight">Class List</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{students.length} Students Total</p>
             </div>
          </div>
          <div className="relative w-full md:w-72">
             <Input 
               placeholder="Search by name or index..." 
               className="pl-10 bg-white"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] pl-6">Index Number</TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Full Name</TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Profile Status</TableHead>
              <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right pr-6">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="h-16 animate-pulse bg-slate-50/30" colSpan={4}>&nbsp;</TableCell>
                </TableRow>
              ))
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                     <Users size={40} className="text-slate-200" />
                     <p className="font-bold italic">No students found matching your search.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredStudents.map((student) => (
              <TableRow key={student.username} className="hover:bg-blue-50/30 transition-colors group">
                <TableCell className="font-black text-slate-900 group-hover:text-blue-600 transition-colors pl-6">{student.username}</TableCell>
                <TableCell>
                   <p className="font-bold text-slate-700">{student.fullName || '—'}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.gender || 'Pending Gender'}</p>
                </TableCell>
                <TableCell>
                  {student.profileCompleted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 w-fit">
                      <CheckCircle2 size={12} />
                      Complete
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200 w-fit">
                      <RefreshCw size={12} />
                      Pending Data
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className={`rounded-xl font-bold tracking-tight ${student.profileCompleted ? 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200'}`}
                    disabled={!student.profileCompleted}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsModalOpen(true);
                    }}
                  >
                    <FileCheck size={16} className="mr-2" />
                    Verify Details
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
